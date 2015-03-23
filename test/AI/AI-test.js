/**
 * Created by mhendren on 3/11/15.
 */
var AI = require('../../js/AI/AI');
var Game = require('../../js/Game/Game');
var Player = require('../../js/Game/Player');
var expect = require('chai').expect;

describe ('AI', function() {
    var ai = null;
    beforeEach(function () {
        ai = new AI(new Game())
    });
    describe('rowcol', function() {
        it('should find 0, 0 for pos 0', function() { expect(ai.rowcol(0)).to.deep.equal([0, 0]); });
        it('should find 0, 1 for pos 1', function() { expect(ai.rowcol(1)).to.deep.equal([0, 1]); });
        it('should find 0, 2 for pos 2', function() { expect(ai.rowcol(2)).to.deep.equal([0, 2]); });
        it('should find 1, 0 for pos 3', function() { expect(ai.rowcol(3)).to.deep.equal([1, 0]); });
        it('should find 1, 1 for pos 4', function() { expect(ai.rowcol(4)).to.deep.equal([1, 1]); });
        it('should find 1, 2 for pos 5', function() { expect(ai.rowcol(5)).to.deep.equal([1, 2]); });
        it('should find 2, 0 for pos 6', function() { expect(ai.rowcol(6)).to.deep.equal([2, 0]); });
        it('should find 2, 1 for pos 7', function() { expect(ai.rowcol(7)).to.deep.equal([2, 1]); });
        it('should find 2, 2 for pos 8', function() { expect(ai.rowcol(8)).to.deep.equal([2, 2]); });
    });
    describe('otherPlayer', function() {
        it ('should find the otherPlayer for O to be X', function() {
            expect((ai.otherPlayer(new Player('O', 'human'))).getPlayer()).to.equal('X');
        });
        it('should find the otherPlayer for X to be O', function() {
            expect((ai.otherPlayer(new Player('X', 'human'))).getPlayer()).to.equal('O');
        })
    });
    describe('choose', function() {
        it('should always find a number in the array [0, 4, 7, 19] (expect 0 out of 10000 to fail)', function() {
            var cnt = 0;
            for(var i = 0; i < 10000; i++) {
                if([0, 4, 7, 19].indexOf(ai.choose([0, 4, 7, 19])) == -1) {
                    cnt++;
                }
            }
            expect(cnt).to.equal(0);
        })
    });
    describe('isEmpty', function () {
        it('should find the layout --------- as empty', function () {
            expect(ai.isEmpty('---------')).to.be.true;
        });
        it('should not find the layout X-------- as empty', function() {
            expect(ai.isEmpty('X--------')).to.be.false;
        });
    });
    describe('isSecondMove', function() {
        it('should find --------- to not be a second move', function () {
            expect(ai.isSecondMove('---------')).to.be.false;
        });
        it('should find --X------ to be a second move', function () {
            expect(ai.isSecondMove('--X------')).to.be.true;
        });
        it('should find ----X---- to be a second move', function () {
            expect(ai.isSecondMove('----X----')).to.be.true;
        });
        it('should find ------X-- to be a second move', function () {
            expect(ai.isSecondMove('------X--')).to.be.true;
        });
        it('should find -X-O----- to not be a second move', function () {
            expect(ai.isSecondMove('-X-O-----')).to.be.false;
        });
        it('should find --X--O-X- to not be a second move', function () {
            expect(ai.isSecondMove('--X--O-X-')).to.be.false;
        });
    });
    describe('makeFirstMove', function() {
        it('should always pick on of 0, 2, 4, 6, or 8 (expect 1000 of 1000 to match)', function () {
            var cnt = 0;
            for(var i = 0; i < 1000; i++) {
                if([0, 2, 4, 6, 8].indexOf(ai.makeFirstMove()) != -1) {
                    cnt++;
                }
            }
            expect(cnt).to.equal(1000);
        });
    });
    describe('validMoves', function() {
        it('should give [0, 1, 2, 3, 4, 5, 6, 7, 8] for layout ---------', function () {
            expect(ai.validMoves('---------')).to.deep.equal([0, 1, 2, 3, 4, 5, 6, 7, 8]);
        });
        it('should give [1, 2, 3, 5, 6, 7, 8] for layout ----X----', function () {
            expect(ai.validMoves('----X----')).to.deep.equal([0, 1, 2, 3, 5, 6, 7, 8]);
        });
        it('should give [0, 5] for layout -XOXO-XOO', function() {
            expect(ai.validMoves('-XOXO-XOO')).to.deep.equal([0, 5]);
        });
    });
    describe('contains', function() {
        it('should not contain 3 for [0, 1, 2]', function() {
            expect(ai.contains([0, 1, 2], 3)).to.be.false;
        });
        it('should contain 2 for [0, 1, 2]', function() {
            expect(ai.contains([0, 1, 2], 2)).to.be.true;
        });
        it('should contain 3 for {x: 1, y: 2, z: 3}', function() {
            expect(ai.contains({x: 1, y: 2, z: 3}, 3)).to.be.true;
        });
        it('should not contain 4 for {x: 1, y: 2, z: 3}', function() {
            expect(ai.contains({x: 1, y: 2, z: 3}, 4)).to.be.false;
        });
    });
    describe('makeSecondMove', function() {
        it('should always select a corner if the center is taken (expect 1000 out of 1000 matches)', function() {
            var cnt = 0;
            for(var i = 0; i < 1000; i++) {
                if([0, 2, 6, 8].indexOf(ai.makeSecondMove('----X----')) != -1) {
                    cnt++;
                }
            }
            expect(cnt).to.equal(1000);
        });
        it('should always pick the center for any corner being taken (expect 1000 out of 1000 matches)', function() {
            var cnt = 0;
            for(var i = 0; i < 250; i++) {
                if (ai.makeSecondMove('X--------') == 4) cnt++;
                if (ai.makeSecondMove('--X------') == 4) cnt++;
                if (ai.makeSecondMove('------X--') == 4) cnt++;
                if (ai.makeSecondMove('--------X') == 4) cnt++;
            }
            expect(cnt).to.equal(1000);
        });
        it('should pick a corner or center if a side square was taken (expect 1000 out of 1000 matches)', function() {
            var cnt = 0;
            for(var i = 0; i < 250; i++) {
                if ([0, 2, 4, 6, 8].indexOf(ai.makeSecondMove('-X-------')) != -1) cnt++;
                if ([0, 2, 4, 6, 8].indexOf(ai.makeSecondMove('---X-----')) != -1) cnt++;
                if ([0, 2, 4, 6, 8].indexOf(ai.makeSecondMove('-----X---')) != -1) cnt++;
                if ([0, 2, 4, 6, 8].indexOf(ai.makeSecondMove('-------X-')) != -1) cnt++;
            }
            expect(cnt).to.equal(1000);
        });
    });
    describe('hasIdiotBall', function() {
        it('should find the idiot ball if the "O" player has played a side square for the second move', function() {
            expect(ai.hasIdiotBall('XO-------', new Player('X', 'human'))).to.be.true;
            expect(ai.hasIdiotBall('X--O-----', new Player('X', 'human'))).to.be.true;
            expect(ai.hasIdiotBall('X----O---', new Player('X', 'human'))).to.be.true;
            expect(ai.hasIdiotBall('X------O-', new Player('X', 'human'))).to.be.true;
            expect(ai.hasIdiotBall('-OX------', new Player('X', 'human'))).to.be.true;
            expect(ai.hasIdiotBall('--XO-----', new Player('X', 'human'))).to.be.true;
            expect(ai.hasIdiotBall('--X--O---', new Player('X', 'human'))).to.be.true;
            expect(ai.hasIdiotBall('--X----O-', new Player('X', 'human'))).to.be.true;
            expect(ai.hasIdiotBall('-O--X----', new Player('X', 'human'))).to.be.true;
            expect(ai.hasIdiotBall('---OX----', new Player('X', 'human'))).to.be.true;
            expect(ai.hasIdiotBall('----XO---', new Player('X', 'human'))).to.be.true;
            expect(ai.hasIdiotBall('----X--O-', new Player('X', 'human'))).to.be.true;
            expect(ai.hasIdiotBall('-O----X--', new Player('X', 'human'))).to.be.true;
            expect(ai.hasIdiotBall('---O--X--', new Player('X', 'human'))).to.be.true;
            expect(ai.hasIdiotBall('-----OX--', new Player('X', 'human'))).to.be.true;
            expect(ai.hasIdiotBall('------XO-', new Player('X', 'human'))).to.be.true;
            expect(ai.hasIdiotBall('-O------X', new Player('X', 'human'))).to.be.true;
            expect(ai.hasIdiotBall('---O----X', new Player('X', 'human'))).to.be.true;
            expect(ai.hasIdiotBall('-----O--X', new Player('X', 'human'))).to.be.true;
            expect(ai.hasIdiotBall('-------OX', new Player('X', 'human'))).to.be.true;
            // just verify one position that corners/center are not idiot balls
            expect(ai.hasIdiotBall('X-O------', new Player('X', 'human'))).to.be.false;
            expect(ai.hasIdiotBall('X---O----', new Player('X', 'human'))).to.be.false;
            expect(ai.hasIdiotBall('X-----O--', new Player('X', 'human'))).to.be.false;
            expect(ai.hasIdiotBall('X-------O', new Player('X', 'human'))).to.be.false;
        });
    });
    describe('forallMoves', function() {
       it('should add a copy of each layout into an array', function() {
           var data = ai.forallMoves('X--------', new Player('O', 'human'), [], function(lay, play, pos, data) {
               return data.concat(lay);
           });
           expect(data.length).to.equal(8);
           expect(data[0]).to.equal('XO-------');
           expect(data[1]).to.equal('X-O------');
           expect(data[2]).to.equal('X--O-----');
           expect(data[3]).to.equal('X---O----');
           expect(data[4]).to.equal('X----O---');
           expect(data[5]).to.equal('X-----O--');
           expect(data[6]).to.equal('X------O-');
           expect(data[7]).to.equal('X-------O');
       });
    });
    describe('generateLayouts', function() {
        it('should generate 8 layouts for X--------', function() {
            var layouts = ai.generateLayouts('X--------', new Player('O', 'human'));
            expect(layouts).to.have.keys(["1", "2", "3", "4", "5", "6", "7", "8"]);
            expect(ai.contains(layouts, 'XO-------')).to.be.true;
            expect(ai.contains(layouts, 'X-O------')).to.be.true;
            expect(ai.contains(layouts, 'X--O-----')).to.be.true;
            expect(ai.contains(layouts, 'X---O----')).to.be.true;
            expect(ai.contains(layouts, 'X----O---')).to.be.true;
            expect(ai.contains(layouts, 'X-----O--')).to.be.true;
            expect(ai.contains(layouts, 'X------O-')).to.be.true;
            expect(ai.contains(layouts, 'X-------O')).to.be.true;
        });
        it('should generate 2 layouts for XOXOXO-X-', function() {
            var layouts = ai.generateLayouts('XOXOXO-X-', new Player('O', 'human'));
            expect(layouts).to.have.keys(["6", "8"]);
            expect(ai.contains(layouts, 'XOXOXOOX-')).to.be.true;
            expect(ai.contains(layouts, 'XOXOXO-XO')).to.be.true;
        });
    });
    describe('findWinner', function() {
        it('should find a winner at 2 for XXXOO---- for X', function() {
            var layouts = {2: 'XXXOO----', 5: 'XX-OOX---', 6: 'XX-OO-X--', 7: 'XX-OO--X-', 8: 'XX-OO---X'};
            expect(ai.findWinner(layouts)).to.equal("2");
        });
        it('should find a winner (tie) for XOXOOXX-O at 8', function() {
            var layouts = {8: 'XOXOOXXXO'};
            expect(ai.findWinner(layouts)).to.equal("8");
        });
        it('should not find a winner for XO-OX-OXO', function() {
            var layouts = {2: 'XOXOX-OXO', 5: 'XO-OXXOXO'};
            expect(ai.findWinner(layouts)).to.be.null;
        })
    });
    describe('mustBlock', function() {
        it('should return [1] for X-X-O---- for player O', function() {
            expect(ai.mustBlock('X-X-O----', new Player('O', 'human'))).to.deep.equal([1]);
        });
        it('should return [1, 5] for X-X-O-O-X for player O', function() {
            expect(ai.mustBlock('X-X-O-O-X', new Player('O', 'human'))).to.deep.equal([1, 5]);
        });
        it('should return no must blocks for X---O---X for player O' , function () {
            expect(ai.mustBlock('X---O---X', new Player('O', 'human'))).to.be.null;
        });
    });
    describe('multiBlockMoves', function() {
        it('should return [2, 6] for X---O---X for player O', function() {
            expect(ai.multiBlockMoves('X---O---X', new Player('O', 'human'))).to.deep.equal([2, 6]);
        });
        it('should return [1, 2] for X---O--X- for player O', function() {
            expect(ai.multiBlockMoves('X---O--X-', new Player('O', 'human'))).to.deep.equal([1, 2]);
        });
        it('should not have multiBlockMoves available for XXO-O-XOX', function() {
            expect(ai.multiBlockMoves('XXO-O-XOX', new Player('O', 'human'))).to.be.null;
        });
    });
    describe('listNonMultiBlockMoves', function() {
        it('should return [1, 3, 5, 7] for X---O---X for player O', function() {
            expect(ai.listNonMultiBlockMoves('X---O---X', new Player('O', 'human'))).to.deep.equal([1, 3, 5, 7]);
        });
        it('should return [3, 5, 6, 8] for X---O--X- for player O', function() {
            expect(ai.listNonMultiBlockMoves('X---O--X-', new Player('O', 'human'))).to.deep.equal([3, 5, 6, 8]);
        });
        it('should return [3, 5] for XXO-O-XOX for player O', function() {
            expect(ai.listNonMultiBlockMoves('XXO-O-XOX', new Player('O', 'human'))).to.deep.equal([3, 5]);
        });
    });
    describe('multiWinMove', function() {
        it('should find a multiWin position at 8 for -OX-X-O--', function() {
            expect(ai.multiWinMoves('-OX-X-O--', new Player('X', 'human'))).to.deep.equal([5, 8]);
        });
        it('should find a multiWin position at 4 for XXO--O--X', function() {
            expect(ai.multiWinMoves('XXO--O--X', new Player('O', 'human'))).to.deep.equal([4]);
        });
        it('should find a multiWin position at 3 for X-O-X---O (though it will lose, because O will win first)', function() {
            expect(ai.multiWinMoves('X-O-X---O', new Player('X', 'human'))).to.deep.equal([3]);
        });
        it('should not find a multiWin position for X---O-OX-', function() {
            expect(ai.multiWinMoves('X---O-OX-', new Player('X', 'human'))).to.be.null;
        })
    });
    describe('selectBestMove', function() {
        it('should return a first move for an empty board (1000 out of 1000 tries)', function() {
            var cnt = 0;
            for(var i = 0; i < 1000; i++) {
                if([0, 2, 4, 6, 8].indexOf(ai.selectBestMove('---------', new Player('X', 'human'))) != -1) {
                    cnt++;
                }
            }
            expect(cnt).to.equal(1000);
        });
        it('should return a second move in center or corner for any side mode (1000 out of 1000 tries)', function() {
            var cnt = 0;
            for(var i = 0; i < 250; i++) {
                if ([0, 2, 4, 6, 8].indexOf(ai.selectBestMove('-X-------', new Player('O', 'human'))) != -1) cnt++;
                if ([0, 2, 4, 6, 8].indexOf(ai.selectBestMove('---X-----', new Player('O', 'human'))) != -1) cnt++;
                if ([0, 2, 4, 6, 8].indexOf(ai.selectBestMove('-----X---', new Player('O', 'human'))) != -1) cnt++;
                if ([0, 2, 4, 6, 8].indexOf(ai.selectBestMove('-------X-', new Player('O', 'human'))) != -1) cnt++;
            }
            expect(cnt).to.equal(1000);
        });
        it('should return a corner move for a move in the center (1000 out of 1000 tries)', function() {
            var cnt = 0;
            for(var i = 0; i< 1000; i++) {
                if ([0, 2, 6, 8].indexOf(ai.selectBestMove('----X----', new Player('O', 'human'))) != -1) cnt++;
            }
            expect(cnt).to.equal(1000);
        });
        it('should select the center second move for any corner selected (1000 out of 1000 tries)', function() {
            var cnt = 0;
            for(var i = 0; i < 250; i++) {
                if (ai.selectBestMove('X--------', new Player('O', 'human')) == 4) cnt++;
                if (ai.selectBestMove('--X------', new Player('O', 'human')) == 4) cnt++;
                if (ai.selectBestMove('------X--', new Player('O', 'human')) == 4) cnt++;
                if (ai.selectBestMove('--------X', new Player('O', 'human')) == 4) cnt++;
            }
            expect(cnt).to.equal(1000);
        });
        it('should always pick a winner when available (1000 out of 1000 tries)', function() {
            var cnt = 0;
            for(var i = 0; i < 250; i++) {
                if (ai.selectBestMove('X-X-O---O', new Player('X', 'human')) == 1) cnt++;
                if (ai.selectBestMove('X-OOX----', new Player('X', 'human')) == 8) cnt++;
                if (ai.selectBestMove('XOXXO----', new Player('O', 'human')) == 7) cnt++;
                if (ai.selectBestMove('OO-XX--X-', new Player('O', 'human')) == 2) cnt++;
            }
            expect(cnt).to.equal(1000);
        });
        it('should always pick a block if it must be taken (1000 out of 1000 tries)', function() {
            var cnt = 0;
            for(var i = 0; i < 250; i++) {
                if (ai.selectBestMove('X-X-O----', new Player('O', 'human')) == 1) cnt++;
                if (ai.selectBestMove('X--O----X', new Player('O', 'human')) == 4) cnt++;
                if (ai.selectBestMove('XOX-O----', new Player('X', 'human')) == 7) cnt++;
                if (ai.selectBestMove('OX-XO----', new Player('X', 'human')) == 8) cnt++;
            }
            expect(cnt).to.equal(1000);
        });
        it('should always pick an appropriate place if idiot ball is in play (1000 out of 1000 tries)', function() {
            var cnt = 0;
            for(var i = 0; i < 250; i++) {
                if (ai.selectBestMove('XO-------', new Player('X', 'human')) == 4) cnt++;
                if (ai.selectBestMove('---O----X', new Player('X', 'human')) == 4) cnt++;
                if (ai.selectBestMove('--X----O-', new Player('X', 'human')) == 4) cnt++;
                if ([0, 2, 6, 8].indexOf(ai.selectBestMove('----XO---', new Player('X', 'human'))) != -1) cnt++;
            }
            expect(cnt).to.equal(1000);
        });
        it('should always pick a multiWin spot if available (1000 out of 1000 tries)', function() {
            var cnt = 0;
            for(var i = 0; i < 500; i++) {
                if ([5, 8].indexOf(ai.selectBestMove('-OX-X-O--', new Player('X', 'human'))) != -1) cnt++;
                if (ai.selectBestMove('XXO--O--X', new Player('O', 'human')) == 4) cnt++;
            }
            expect(cnt).to.equal(1000);
        });
        it('should never select a position that would allow a multiBlock (1000 out of 1000 tries)', function() {
            var cnt = 0;
            for(var i = 0; i < 250; i++) {
                if ([2, 6].indexOf(ai.selectBestMove('X---O---X', new Player('O', 'human'))) == -1) cnt++;
                if ([0, 8].indexOf(ai.selectBestMove('--X-O-X--', new Player('O', 'human'))) == -1) cnt++;
                if ([1, 3].indexOf(ai.selectBestMove('X---X---O', new Player('O', 'human'))) == -1) cnt++;
                if ([5, 7].indexOf(ai.selectBestMove('--X-X-O--', new Player('O', 'human'))) == -1) cnt++;
            }
            expect(cnt).to.equal(1000);
        });
        it('should never pick a move that would set up a possible win by second player (400 out of 400 tries)', function() {
            var cnt = 0;
            for(var i = 0; i < 100; i++) {
                if ([5, 7].indexOf(ai.selectBestMove('X-------O', new Player('X', 'human'))) == -1) cnt++;
                if ([3, 7].indexOf(ai.selectBestMove('--X---O--', new Player('X', 'human'))) == -1) cnt++;
                if ([1, 5].indexOf(ai.selectBestMove('--O---X--', new Player('X', 'human'))) == -1) cnt++;
                if ([1, 3].indexOf(ai.selectBestMove('O-------X', new Player('X', 'human'))) == -1) cnt++;
            }
            expect(cnt).to.equal(400);
        });
    });
});
