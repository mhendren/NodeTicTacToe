/**
 * Created by mhendren on 3/8/15.
 */

var Board = require('../Game/Board');
var Evaluator = require('../Game/Evaluator');
var Player = require('../Game/Player');

module.exports = function(game) {
    function rowcol(pos) {
        return [Math.floor(pos / 3), pos % 3];
    }
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

    function generateLayouts(layout, currentPlayer) {
        var valid = validMoves(layout);
        var layouts = {};
        for(var move in valid) {
            if (!valid.hasOwnProperty(move)) continue;
            var pos = valid[move];
            var board = new Board(layout);
            board.SetSquare(currentPlayer, Math.floor(pos / 3), pos % 3);
            layouts[pos] = board.getLayout();
        }
        return layouts;
    }

    function findWinner(layouts) {
        var evaluator = new Evaluator();
        for(var move in layouts) {
            if (!layouts.hasOwnProperty(move)) continue;
            if (evaluator.isTie(layouts[move])) {
                return move;
            }
            var winners = evaluator.winner(layouts[move]);
            if (winners.length > 0) {
                return move;
            }
        }
        return null;
    }

    function mustBlock(layout, currentPlayer) {
        var valid = validMoves(layout);
        var blocks = [];
        for (var move in valid) {
            if (!valid.hasOwnProperty(move)) continue;
            var pos = valid[move];
            var rc = rowcol(pos);
            var board = new Board(layout);
            board.SetSquare(otherPlayer(currentPlayer), rc[0], rc[1]);
            var evaluator = new Evaluator();
            var winner = evaluator.winner(board.getLayout());
            if (winner.length > 0) {
                blocks.push(pos);
            }
        }
        return blocks.length == 0 ? null : blocks;
    }


    function multiBlockMoves(layout, currentPlayer) {
        var valid = validMoves(layout);
        var multiBlocks = [];
        for (var move in valid) {
            if (!valid.hasOwnProperty(move)) continue;
            var pos = valid[move];
            var rc = rowcol(pos);
            var board = new Board(layout);
            board.SetSquare(currentPlayer, rc[0], rc[1]);
            var oppValid = validMoves(board.getLayout());
            for(var oppMove in oppValid) {
                if (!oppValid.hasOwnProperty(oppMove)) continue;
                var oppPos = oppValid[oppMove];
                var oppRC = rowcol(oppPos);
                var oppBoard = new Board(board.getLayout());
                oppBoard.SetSquare(otherPlayer(currentPlayer), oppRC[0], oppRC[1]);
                var mustBlocks = mustBlock(oppBoard.getLayout(), currentPlayer);
                if (mustBlocks && mustBlocks.length > 1) {
                    if(!findWinner(generateLayouts(oppBoard.getLayout(), currentPlayer))) {
                        multiBlocks.push(pos);
                    }
                }
            }
        }
        return multiBlocks.length == 0 ? null : multiBlocks;
    }

    function listNonMultiBlockMoves(layout, currentPlayer) {
        var valid = validMoves(layout);
        var multiBlocks = multiBlockMoves(layout, currentPlayer);
        var nonMultiBlocks = [];
        for (var move in valid) {
            if (!valid.hasOwnProperty(move)) continue;
            if (!multiBlocks || multiBlocks.indexOf(valid[move]) == -1) {
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
        var layouts = generateLayouts(layout, currentPlayer);
        var winner = findWinner(layouts);
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
        rowcol: rowcol,
        otherPlayer: otherPlayer,
        isEmpty: isEmpty,
        choose: choose,
        isSecondMove: isSecondMove,
        makeFirstMove: makeFirstMove,
        validMoves: validMoves,
        contains: contains,
        makeSecondMove: makeSecondMove,
        generateLayouts: generateLayouts,
        findWinner: findWinner,
        mustBlock: mustBlock,
        multiBlockMoves: multiBlockMoves,
        listNonMultiBlockMoves: listNonMultiBlockMoves,
        selectBestMove: selectBestMove,


        play: function(currentPlayer) {
            return play(currentPlayer);
        }
    };
};