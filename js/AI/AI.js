/**
 * Created by mhendren on 3/8/15.
 */

var Board = require('../Game/Board');
var Evaluator = require('../Game/Evaluator');
var Player = require('../Game/Player');

module.exports = function(game) {
    function otherPlayer(currentPlayer) {
        if (currentPlayer.getPlayer() === 'X') return new Player('O', 'human');
        return new Player('X', 'human');
    }

    function choose(arr) {
        return arr[Math.floor(Math.random()*arr.length)];
    }

    function isEmpty(layout) {
        return layout === "---------";
    }

    function isSecondMove(layout) {
        return layout.match(/-/g, []).length == 8;
    }

    function makeFirstMove() {
        return choose([0, 2, 4, 6, 8]);
    }

    function validMoves(layout) {
        var valid = [];
        for(var i = 0, squares = layout.split(''); i < squares.length; i++) {
            if (squares[i] === '-') {
                valid.push(i);
            }
        }
        return valid;
    }

    function contains(arr, value) {
        for(var x in arr) {
            if (!arr.hasOwnProperty(x)) continue;
            if (arr[x] == value) return true;
        }
        return false;
    }

    function makeSecondMove(layout) {
        var valid = validMoves(layout);
        if (!contains(valid, 4)) {
            return choose([0, 2, 6, 8]);
        }
        else if (!contains(valid, 0) || !contains(valid, 2) || !contains(valid, 6) || !contains(valid, 8)) {
            return 4;
        }
        return choose([0, 2, 4, 6, 8]);
    }

    function generateBoards(layout, currentPlayer) {
        var valid = validMoves(layout);
        var boards = {};
        for(var move in valid) {
            if (!valid.hasOwnProperty(move)) continue;
            var pos = valid[move];
            var board = new Board(layout);
            board.SetSquare(currentPlayer, Math.floor(pos / 3), pos % 3);
            boards[pos] = board.getLayout();
        }
        return boards;
    }

    function findWinner(boards) {
        var evaluator = new Evaluator();
        for(var move in boards) {
            if (!boards.hasOwnProperty(move)) continue;
            if (evaluator.isTie(boards[move])) {
                return move;
            }
            var winners = evaluator.winner(boards[move]);
            if (winners.length > 0) {
                return move;
            }
        }
        return null;
    }

    function mustBlock(layout, currentPlayer) {
        var valid = validMoves(layout);
        for(var move in valid) {
            if (!valid.hasOwnProperty(move)) continue;
            var pos = valid[move];
            var board = new Board(layout);
            board.SetSquare(otherPlayer(currentPlayer), Math.floor(pos / 3), pos % 3);
            var evaluator = new Evaluator();
            var winner = evaluator.winner(board.getLayout());
            if (winner.length > 0) {
                return pos;
            }
        }
        return null;
    }

    function multiBlockMoves(layout, currentPlayer) {
        var valid = validMoves(layout);
        var multiBlocks = [];
        for (var move in valid) {
            if(!valid.hasOwnProperty(move)) continue;
            var pos = valid[move];
            var board = new Board(layout);
            board.SetSquare(currentPlayer, Math.floor(pos / 3), pos % 3);
            var oppValid = validMoves(board.getLayout());
            var winCount = 0;
            for(var oppMove in oppValid) {
                if (!oppValid.hasOwnProperty(oppMove)) continue;
                var oppPos = oppValid[oppMove];
                var oppBoard = new Board(board.getLayout());
                oppBoard.SetSquare(otherPlayer(currentPlayer), Math.floor(oppPos / 3), oppPos % 3);
                var evaluator = new Evaluator();
                var winner = evaluator.winner(oppBoard.getLayout());
                if (winner.length > 0)
                    winCount++;
            }
            if (winCount > 1) {
                multiBlocks.push(move);
            }
        }
        return multiBlocks;
    }

    function listNonMultiBlockMoves(layout, currentPlayer) {
        var valid = validMoves(layout);
        var multiBlocks = multiBlockMoves(layout, currentPlayer);
        var nonMultiBlocks = [];
        for (var move in valid) {
            if (!valid.hasOwnProperty(move)) continue;
            if (multiBlocks.indexOf(valid[move]) == -1) {
                nonMultiBlocks.push(valid[move]);
            }
        }
        return nonMultiBlocks;
    }

    function selectBestMove(layout, currentPlayer) {
        if (isEmpty(layout)) {
            return makeFirstMove();
        }
        else if (isSecondMove(layout)) {
            return makeSecondMove(layout);
        }
        var boards = generateBoards(layout, currentPlayer);
        var winner = findWinner(boards);
        if (winner != null) {
            return winner;
        }
        var must = mustBlock(layout, currentPlayer);
        if (must != null) {
            return must;
        }
        var nonMultiBlocks = listNonMultiBlockMoves(layout, currentPlayer);
        if (nonMultiBlocks.length > 0) {
            return choose(nonMultiBlocks);
        }
        // uh oh, something went wrong, and there are no moves that can't be setup for wins in more than one
        // direction
        return choose(validMoves(layout));
    }

    function play(currentPlayer) {
        var move = selectBestMove(game.board.getLayout(), currentPlayer);
        game.PlaceMark(Math.floor(move / 3), move % 3);
    }

    return {
        play: function(currentPlayer) {
            return play(currentPlayer);
        }
    };
};