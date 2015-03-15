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

    function hasIdiotBall(layout, currentPlayer) {
        // The idiot ball means that the O player has played a size square, and the X player has played proper.
        // If the X player played a corner or center first, and the O player played a side second, you can
        // ALWAYS force them into a doubleBlock.
        return currentPlayer.getPlayer() == 'X' &&
            layout.indexOf('X') % 2 == 0 &&
            layout.indexOf('O') % 2 == 1 &&
            layout.match(/-/g, []).length == 7;
    }

    function forallMoves(layout, currentPlayer, data, fn) {
        var valid = validMoves(layout);
        for(var move in valid) {
            if(!valid.hasOwnProperty(move)) continue;
            var pos = valid[move];
            var board = new Board(layout);
            board.SetSquare(currentPlayer, rowcol(pos)[0], rowcol(pos)[1]);
            data = fn(board.getLayout(), currentPlayer, pos, data);
        }
        return data;
    }

    function generateLayouts(layout, currentPlayer) {
        return forallMoves(layout, currentPlayer, {}, function(lay, play, pos, data) {
            data[pos] = lay;
            return data;
        });
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
        var blocks = forallMoves(layout, otherPlayer(currentPlayer), [], function(lay, play, pos, data) {
            var evaluator = new Evaluator();
            if (evaluator.winner(lay).length > 0) {
                return data.concat(pos);
            }
            return data;
        });
        return blocks.length == 0 ? null : blocks;
    }

    function multiBlockMoves(layout, currentPlayer) {
        var multiBlocks = forallMoves(layout, currentPlayer, [], function(lay, play, pos, data) {
            data = forallMoves(lay, otherPlayer(play), data, function(lay2, play2, pos2, data2) {
                var mustBlocks = mustBlock(lay2, play);
                if (mustBlocks && mustBlocks.length > 1) {
                    if (!findWinner(generateLayouts(lay2, play)) && data2.indexOf(pos) == -1) {
                        return data2.concat(pos);
                    }
                }
                return data2;
            });
            return data;
        });
        return !multiBlocks || multiBlocks.length == 0 ? null : multiBlocks;
    }

    function listNonMultiBlockMoves(layout, currentPlayer) {
        var valid = validMoves(layout);
        var multiBlocks = multiBlockMoves(layout, currentPlayer);
        return valid.filter(function(x) { return !multiBlocks || multiBlocks.indexOf(x) == -1; });
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
        hasIdiotBall: hasIdiotBall,
        forallMoves: forallMoves,
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