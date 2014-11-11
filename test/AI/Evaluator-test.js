var Evaluator = require("../../js/AI/Evaluator.js");

var chai = require("chai");
var expect = chai.expect;

var evaluator = null;
before(function() {
    evaluator = new Evaluator();
});

describe("invalid board", function() {
    it("should have an invalid board if there are fewer than 9 squares", function(done) {
        expect(evaluator.isValid.bind(evaluator, "--------")).to.throw("Board size is not exactly 9 squares");
        done();
    });
    it("should have an invalid board if there are more than 9 squares", function(done) {
        expect(evaluator.isValid.bind(evaluator, "----------")).to.throw("Board size is not exactly 9 squares");
        done();
    });
    it("should not have an invalid board on an empty board with 9 squares", function(done) {
        expect(evaluator.isValid.bind(evaluator, "---------")).to.not.throw("Board size is not exactly 9 squares");
        done();
    });
    it("should have an invalid board if there is an invalid mark (not X, O, or empty) [---n-----]", function(done) {
        expect(evaluator.isValid.bind(evaluator, "---n-----")).to.throw("Invalid square in board");
        done();
    });
    it("should have an invalid board if both sides are winners [OOO---XXX]", function(done) {
        expect(evaluator.isValid.bind(evaluator, "OOO---XXX")).to.throw("Board contains more than one winner");
        done();
    });
    it("should have an invalid board on unbalanced play [OXXXOXXXO]", function(done) {
        expect(evaluator.isValid.bind(evaluator, "OXXXOXXXO")).to.throw("Board is off balance");
        done();
    });
    it("should have an invalid board on unbalanced play [OOXO-OXX-] (O went first)", function(done) {
        expect(evaluator.isValid.bind(evaluator, "OOXO-OXX-")).to.throw("Board is off balance");
        done();
    })
});

describe("winner with rows all Xs", function() {
    it('should find winner X [XXX------] with top row all Xs', function(done) {
        var winners = evaluator.winner("XXX------");
        expect(winners.length).to.equal(1);
        expect(winners[0].player).to.equal('X');
        expect(winners[0].winAt).to.deep.equal([0, 1, 2]);
        done();
    });
    it("should find winner X [---XXX---] with middle row all Xs", function(done) {
        var winners = evaluator.winner("---XXX---");
        expect(winners.length).to.equal(1);
        expect(winners[0].player).to.equal('X');
        expect(winners[0].winAt).to.deep.equal([3, 4, 5]);
        done();
    });
    it("should find winner X [------XXX] with bottom row all Xs", function(done) {
        var winners = evaluator.winner("------XXX");
        expect(winners.length).to.equal(1);
        expect(winners[0].player).to.equal('X');
        expect(winners[0].winAt).to.deep.equal([6, 7, 8]);
        done();
    });
});

describe("winner with rows all Os", function() {
    it("should find winner O [OOO------] with top row all Os", function(done) {
        var winners = evaluator.winner("OOO------");
        expect(winners.length).to.equal(1);
        expect(winners[0].player).to.equal('O');
        expect(winners[0].winAt).to.deep.equal([0, 1, 2]);
        done();
    });
    it("should find winner O [---OOO---] with middle row all Os", function(done) {
        var winners = evaluator.winner("---OOO---");
        expect(winners.length).to.equal(1);
        expect(winners[0].player).to.equal('O');
        expect(winners[0].winAt).to.deep.equal([3, 4, 5]);
        done();
    });
    it("should find winner O [------OOO] with bottom row all Os", function(done) {
        var winners = evaluator.winner("------OOO");
        expect(winners.length).to.equal(1);
        expect(winners[0].player).to.equal('O');
        expect(winners[0].winAt).to.deep.equal([6, 7, 8]);
        done();
    });
});

describe("winner with all columns Xs", function() {
    it("should find winner X [X--X--X--] with left column all Xs", function(done) {
        var winners = evaluator.winner("X--X--X--");
        expect(winners.length).to.equal(1);
        expect(winners[0].player).to.equal('X');
        expect(winners[0].winAt).to.deep.equal([0, 3, 6]);
        done();
    });
    it("should find winner X [-X--X--X-] with middle column all Xs", function(done) {
        var winners = evaluator.winner("-X--X--X-");
        expect(winners.length).to.equal(1);
        expect(winners[0].player).to.equal('X');
        expect(winners[0].winAt).to.deep.equal([1, 4, 7]);
        done();
    });
    it("should find winner X [--X--X--X] with right column all Xs", function(done) {
        var winners = evaluator.winner("--X--X--X");
        expect(winners.length).to.equal(1);
        expect(winners[0].player).to.equal('X');
        expect(winners[0].winAt).to.deep.equal([2, 5, 8]);
        done();
    });
});

describe("winner with all columns Os", function() {
    it("should find winner O [O--O--O--] with left column all Os", function(done) {
        var winners = evaluator.winner("O--O--O--");
        expect(winners.length).to.equal(1);
        expect(winners[0].player).to.equal('O');
        expect(winners[0].winAt).to.deep.equal([0, 3, 6]);
        done();
    });
    it("should find winner O [-O--O--O-] with middle column all Os", function(done) {
        var winners = evaluator.winner("-O--O--O-");
        expect(winners.length).to.equal(1);
        expect(winners[0].player).to.equal('O');
        expect(winners[0].winAt).to.deep.equal([1, 4, 7]);
        done();
    });
    it("should find winner O [--O--O--O] with right column all Os", function(done) {
        var winners = evaluator.winner("--O--O--O");
        expect(winners.length).to.equal(1);
        expect(winners[0].player).to.equal('O');
        expect(winners[0].winAt).to.deep.equal([2, 5, 8]);
        done();
    })
});

describe("winner with diagonal Xs", function() {
    it("should find winner X [X---X---X] with top left to bottom right diagonal all Xs", function(done) {
        var winners = evaluator.winner("X---X---X");
        expect(winners.length).to.equal(1);
        expect(winners[0].player).to.equal('X');
        expect(winners[0].winAt).to.deep.equal([0, 4, 8]);
        done();
    });
    it("should find winner X [--X-X-X--] with top right to bottom left diagonal all Xs", function(done) {
        var winners = evaluator.winner("--X-X-X--");
        expect(winners.length).to.equal(1);
        expect(winners[0].player).to.equal('X');
        expect(winners[0].winAt).to.deep.equal([2, 4, 6]);
        done();
    });
});

describe("winner with diagonal Os", function() {
    it("should find winner O [O---O---O] with top left to bottom right diagonal all Os", function(done) {
        var winners = evaluator.winner("O---O---O");
        expect(winners.length).to.equal(1);
        expect(winners[0].player).to.equal('O');
        expect(winners[0].winAt).to.deep.equal([0, 4, 8]);
        done();
    });
    it("should find winner O [--O-O-O--] with top right to bottom left diagonal all Os", function(done) {
        var winners = evaluator.winner("--O-O-O--");
        expect(winners.length).to.equal(1);
        expect(winners[0].player).to.equal('O');
        expect(winners[0].winAt).to.deep.equal([2, 4, 6]);
        done();
    });
});

describe("no winner incomplete board", function() {
    it("should not find a winner on empty board [---------]", function(done) {
        var winners = evaluator.winner("---------");
        expect(winners.length).to.equal(0);
        done();
    });
    it("should not find a winner on incomplete board1 [XO-------]", function(done) {
        var winners = evaluator.winner("XO-------");
        expect(winners.length).to.equal(0);
        done();
    });
    it("should not find a winner on incomplete board2 [XOX-XO---]", function(done) {
        var winners = evaluator.winner("XOX-XO---");
        expect(winners.length).to.equal(0);
        done();
    });
    it("should not find a winner on incomplete board3 [OOXX-XOXO]", function(done) {
        var winners = evaluator.winner("OOXX-XOXO");
        expect(winners.length).to.equal(0);
        done();
    });
    it("should not find a winner on incomplete board4 [XOXOXO-XO]", function(done) {
        var winners = evaluator.winner("XOXOXO-XO");
        expect(winners.length).to.equal(0);
        done();
    });
});

describe("identify a complete board", function() {
    it("should not find a complete board on incomplete board1 [XO-------]", function(done) {
        var complete = evaluator.isComplete("XO-------");
        expect(complete).to.be.false;
        done();
    });
    it("should not find a complete board on incomplete board2 [XOX-XO---]", function(done) {
        var complete = evaluator.isComplete("XOX-XO---");
        expect(complete).to.be.false;
        done();
    });
    it("should not find a complete board on incomplete board3 [OOXX-XOXO]", function(done) {
        var complete = evaluator.isComplete("OOXX-XOXO");
        expect(complete).to.be.false;
        done();
    });
    it("should not find a complete board on incomplete board4 [XOXOXO-XO]", function(done) {
        var complete = evaluator.isComplete("XOXOXO-XO");
        expect(complete).to.be.false;
        done();
    });
    it("should find a complete board on complete board1 [XOXXOOOXX]", function(done) {
        var complete = evaluator.isComplete("XOXXOOOXX");
        expect(complete).to.be.true;
        done();
    });
    it("should find a complete board on complete board2 [OXOXXOXOX]", function(done) {
        var complete = evaluator.isComplete("OXOXXOXOX");
        expect(complete).to.be.true;
        done();
    });
    it("should find a complete board on complete board3 [XXOOOXXOX]", function(done){
        var complete = evaluator.isComplete("XXOOOXXOX");
        expect(complete).to.be.true;
        done();
    });
    it("should find a complete board on complete board4 [OXXXOXOOX]", function(done) {
        var complete = evaluator.isComplete("OXXXOXOOX");
        expect(complete).to.be.true;
        done();
    });
});

describe("no winner complete board", function() {
    it("should not find a winner on tie board1 [XOXXOOOXX]", function(done) {
        var winner = evaluator.winner("XOXXOOOXX");
        expect(winner.length).to.equal(0);
        done();
    });
    it("should not find a winner on tie board2 [OXOXXOXOX]", function(done) {
        var winner = evaluator.winner("OXOXXOXOX");
        expect(winner.length).to.equal(0);
        done();
    });
    it("should not find a winner on tie board3 [XXOOOXXOX]", function(done) {
        var winner = evaluator.winner("XXOOOXXOX");
        expect(winner.length).to.equal(0);
        done();
    });
    it("should not find a winner on tie board4 [OXXXOOOXX]", function(done) {
        var winner = evaluator.winner("OXXXOOOXX");
        expect(winner.length).to.equal(0);
        done();
    });
});

describe("find a tie on a tie board", function() {
    it("should not find a tie on complete board1 [XOXOXOOXX]", function(done) {
        var tie = evaluator.isTie("XOXOXOOXX");
        expect(tie).to.be.false;
        done();
    });
    it("should not find a tie on complete board2 [OXXXOXOOX]", function(done) {
        var tie = evaluator.isTie("OXXXOXOOX");
        expect(tie).to.be.false;
        done();
    });
    it("should not find a tie on complete board3 [XOXOOXOXX]]", function(done) {
        var tie = evaluator.isTie("XOXOOXOXX");
        expect(tie).to.be.false;
        done();
    });
    it("should find a tie on tie board1 [XOXXOOOXX]", function(done) {
        var tie = evaluator.isTie("XOXXOOOXX");
        expect(tie).to.be.true;
        done();
    });
    it("should find a tie on tie board2 [OXOXOXXOX]", function(done) {
        var tie = evaluator.isTie("OXOXOXXOX");
        expect(tie).to.be.true;
        done();
    });
    it("should find a tie on tie board3 [XXOOOXXOX]", function(done) {
        var tie = evaluator.isTie("XXOOOXXOX");
        expect(tie).to.be.true;
        done();
    });
    it("should find a tie on tie board4 [OXXXOOOXX]", function(done) {
        var tie = evaluator.isTie("OXXXOOOXX");
        expect(tie).to.be.true;
        done();
    });
});