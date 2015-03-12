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
        it('should always pick on of 0, 2, 4, 6, or 8 (expect 10000 of 10000 to match)', function () {
            var cnt = 0;
            for(var i = 0; i < 10000; i++) {
                if([0, 2, 4, 6, 8].indexOf(ai.makeFirstMove()) != -1) {
                    cnt++;
                }
            }
            expect(cnt).to.equal(10000);
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
        it('should always select a corner if the center is taken (expect 10000 out of 10000 matches)', function() {
            var cnt = 0;
            for(var i = 0; i < 10000; i++) {
                if([0, 2, 6, 8].indexOf(ai.makeSecondMove('----X----')) != -1) {
                    cnt++;
                }
            }
            expect(cnt).to.equal(10000);
        });
        it('should always pick the center for any corner being taken (expect 40000 out of 40000 matches)', function() {
            var cnt = 0;
            for(var i = 0; i < 10000; i++) {
                if (ai.makeSecondMove('X--------') == 4) cnt++;
                if (ai.makeSecondMove('--X------') == 4) cnt++;
                if (ai.makeSecondMove('------X--') == 4) cnt++;
                if (ai.makeSecondMove('--------X') == 4) cnt++;
            }
            expect(cnt).to.equal(40000);
        });
        it('should pick a corner or center if a side square was taken (expect 40000 out of 40000 matches)', function() {
            var cnt = 0;
            for(var i = 0; i < 10000; i++) {
                if ([0, 2, 4, 6, 8].indexOf(ai.makeSecondMove('-X-------')) != -1) cnt++;
                if ([0, 2, 4, 6, 8].indexOf(ai.makeSecondMove('---X-----')) != -1) cnt++;
                if ([0, 2, 4, 6, 8].indexOf(ai.makeSecondMove('-----X---')) != -1) cnt++;
                if ([0, 2, 4, 6, 8].indexOf(ai.makeSecondMove('-------X-')) != -1) cnt++;
            }
            expect(cnt).to.equal(40000);
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
});
