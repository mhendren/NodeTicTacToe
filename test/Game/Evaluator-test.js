var Evaluator = require("../../js/Game/Evaluator.js");

var evaluator = null;
before(function() {
    evaluator = new Evaluator();
});

describe("invalid board", function() {
    it("should have an invalid board if there are fewer than 9 squares", function() {
        evaluator.isValid.bind(evaluator, "--------").should.throw("Board size is not exactly 9 squares");
    });
    it("should have an invalid board if there are more than 9 squares", function() {
        evaluator.isValid.bind(evaluator, "----------").should.throw("Board size is not exactly 9 squares");
    });
    it("should not have an invalid board on an empty board with 9 squares", function() {
        evaluator.isValid.bind(evaluator, "---------").should.not.throw("Board size is not exactly 9 squares");
    });
    it("should have an invalid board if there is an invalid mark (not X, O, or empty) [---n-----]", function() {
        evaluator.isValid.bind(evaluator, "---n-----").should.throw("Invalid square in board");
    });
    it("should have an invalid board if both sides are winners [OOO---XXX]", function() {
        evaluator.isValid.bind(evaluator, "OOO---XXX").should.throw("Board contains more than one winner");
    });
    it("should have an invalid board on unbalanced play [OXXXOXXXO]", function() {
        evaluator.isValid.bind(evaluator, "OXXXOXXXO").should.throw("Board is off balance");
    });
    it("should have an invalid board on unbalanced play [OOXO-OXX-] (O went first)", function() {
        evaluator.isValid.bind(evaluator, "OOXO-OXX-").should.throw("Board is off balance");
    });
});

describe("winner with rows all Xs", function() {
    it('should find winner X [XXX------] with top row all Xs', function() {
        var winners = evaluator.winner("XXX------");
        winners.length.should.equal(1);
        winners[0].player.should.equal('X');
        winners[0].winAt.should.deep.equal([0, 1, 2]);
    });
    it("should find winner X [---XXX---] with middle row all Xs", function() {
        var winners = evaluator.winner("---XXX---");
        winners.length.should.equal(1);
        winners[0].player.should.equal('X');
        winners[0].winAt.should.deep.equal([3, 4, 5]);
    });
    it("should find winner X [------XXX] with bottom row all Xs", function() {
        var winners = evaluator.winner("------XXX");
        winners.length.should.equal(1);
        winners[0].player.should.equal('X');
        winners[0].winAt.should.deep.equal([6, 7, 8]);
    });
});

describe("winner with rows all Os", function() {
    it("should find winner O [OOO------] with top row all Os", function() {
        var winners = evaluator.winner("OOO------");
        winners.length.should.equal(1);
        winners[0].player.should.equal('O');
        winners[0].winAt.should.deep.equal([0, 1, 2]);
    });
    it("should find winner O [---OOO---] with middle row all Os", function() {
        var winners = evaluator.winner("---OOO---");
        winners.length.should.equal(1);
        winners[0].player.should.equal('O');
        winners[0].winAt.should.deep.equal([3, 4, 5]);
    });
    it("should find winner O [------OOO] with bottom row all Os", function() {
        var winners = evaluator.winner("------OOO");
        winners.length.should.equal(1);
        winners[0].player.should.equal('O');
        winners[0].winAt.should.deep.equal([6, 7, 8]);
    });
});

describe("winner with all columns Xs", function() {
    it("should find winner X [X--X--X--] with left column all Xs", function() {
        var winners = evaluator.winner("X--X--X--");
        winners.length.should.equal(1);
        winners[0].player.should.equal('X');
        winners[0].winAt.should.deep.equal([0, 3, 6]);
    });
    it("should find winner X [-X--X--X-] with middle column all Xs", function() {
        var winners = evaluator.winner("-X--X--X-");
        winners.length.should.equal(1);
        winners[0].player.should.equal('X');
        winners[0].winAt.should.deep.equal([1, 4, 7]);
    });
    it("should find winner X [--X--X--X] with right column all Xs", function() {
        var winners = evaluator.winner("--X--X--X");
        winners.length.should.equal(1);
        winners[0].player.should.equal('X');
        winners[0].winAt.should.deep.equal([2, 5, 8]);
    });
});

describe("winner with all columns Os", function() {
    it("should find winner O [O--O--O--] with left column all Os", function() {
        var winners = evaluator.winner("O--O--O--");
        winners.length.should.equal(1);
        winners[0].player.should.equal('O');
        winners[0].winAt.should.deep.equal([0, 3, 6]);
    });
    it("should find winner O [-O--O--O-] with middle column all Os", function() {
        var winners = evaluator.winner("-O--O--O-");
        winners.length.should.equal(1);
        winners[0].player.should.equal('O');
        winners[0].winAt.should.deep.equal([1, 4, 7]);
    });
    it("should find winner O [--O--O--O] with right column all Os", function() {
        var winners = evaluator.winner("--O--O--O");
        winners.length.should.equal(1);
        winners[0].player.should.equal('O');
        winners[0].winAt.should.deep.equal([2, 5, 8]);
    })
});

describe("winner with diagonal Xs", function() {
    it("should find winner X [X---X---X] with top left to bottom right diagonal all Xs", function() {
        var winners = evaluator.winner("X---X---X");
        winners.length.should.equal(1);
        winners[0].player.should.equal('X');
        winners[0].winAt.should.deep.equal([0, 4, 8]);
    });
    it("should find winner X [--X-X-X--] with top right to bottom left diagonal all Xs", function() {
        var winners = evaluator.winner("--X-X-X--");
        winners.length.should.equal(1);
        winners[0].player.should.equal('X');
        winners[0].winAt.should.deep.equal([2, 4, 6]);
    });
});

describe("winner with diagonal Os", function() {
    it("should find winner O [O---O---O] with top left to bottom right diagonal all Os", function() {
        var winners = evaluator.winner("O---O---O");
        winners.length.should.equal(1);
        winners[0].player.should.equal('O');
        winners[0].winAt.should.deep.equal([0, 4, 8]);
    });
    it("should find winner O [--O-O-O--] with top right to bottom left diagonal all Os", function() {
        var winners = evaluator.winner("--O-O-O--");
        winners.length.should.equal(1);
        winners[0].player.should.equal('O');
        winners[0].winAt.should.deep.equal([2, 4, 6]);
    });
});

describe("no winner incomplete board", function() {
    it("should not find a winner on empty board [---------]", function() {
        var winners = evaluator.winner("---------");
        winners.length.should.equal(0);
    });
    it("should not find a winner on incomplete board1 [XO-------]", function() {
        var winners = evaluator.winner("XO-------");
        winners.length.should.equal(0);
    });
    it("should not find a winner on incomplete board2 [XOX-XO---]", function() {
        var winners = evaluator.winner("XOX-XO---");
        winners.length.should.equal(0);
    });
    it("should not find a winner on incomplete board3 [OOXX-XOXO]", function() {
        var winners = evaluator.winner("OOXX-XOXO");
        winners.length.should.equal(0);
    });
    it("should not find a winner on incomplete board4 [XOXOXO-XO]", function() {
        var winners = evaluator.winner("XOXOXO-XO");
        winners.length.should.equal(0);
    });
});

describe("identify a complete board", function() {
    it("should not find a complete board on incomplete board1 [XO-------]", function() {
        var complete = evaluator.isComplete("XO-------");
        complete.should.be.false;
    });
    it("should not find a complete board on incomplete board2 [XOX-XO---]", function() {
        var complete = evaluator.isComplete("XOX-XO---");
        complete.should.be.false;
    });
    it("should not find a complete board on incomplete board3 [OOXX-XOXO]", function() {
        var complete = evaluator.isComplete("OOXX-XOXO");
        complete.should.be.false;
    });
    it("should not find a complete board on incomplete board4 [XOXOXO-XO]", function() {
        var complete = evaluator.isComplete("XOXOXO-XO");
        complete.should.be.false;
    });
    it("should find a complete board on complete board1 [XOXXOOOXX]", function() {
        var complete = evaluator.isComplete("XOXXOOOXX");
        complete.should.be.true;
    });
    it("should find a complete board on complete board2 [OXOXXOXOX]", function() {
        var complete = evaluator.isComplete("OXOXXOXOX");
        complete.should.be.true;
    });
    it("should find a complete board on complete board3 [XXOOOXXOX]", function() {
        var complete = evaluator.isComplete("XXOOOXXOX");
        complete.should.be.true;
    });
    it("should find a complete board on complete board4 [OXXXOXOOX]", function() {
        var complete = evaluator.isComplete("OXXXOXOOX");
        complete.should.be.true;
    });
});

describe("no winner complete board", function() {
    it("should not find a winner on tie board1 [XOXXOOOXX]", function() {
        var winner = evaluator.winner("XOXXOOOXX");
        winner.length.should.equal(0);
    });
    it("should not find a winner on tie board2 [OXOXXOXOX]", function() {
        var winner = evaluator.winner("OXOXXOXOX");
        winner.length.should.equal(0);
    });
    it("should not find a winner on tie board3 [XXOOOXXOX]", function() {
        var winner = evaluator.winner("XXOOOXXOX");
        winner.length.should.equal(0);
    });
    it("should not find a winner on tie board4 [OXXXOOOXX]", function() {
        var winner = evaluator.winner("OXXXOOOXX");
        winner.length.should.equal(0);
    });
});

describe("find a tie on a tie board", function() {
    it("should not find a tie on complete board1 [XOXOXOOXX]", function() {
        var tie = evaluator.isTie("XOXOXOOXX");
        tie.should.be.false;
    });
    it("should not find a tie on complete board2 [OXXXOXOOX]", function() {
        var tie = evaluator.isTie("OXXXOXOOX");
        tie.should.be.false;
    });
    it("should not find a tie on complete board3 [XOXOOXOXX]]", function() {
        var tie = evaluator.isTie("XOXOOXOXX");
        tie.should.be.false;
    });
    it("should find a tie on tie board1 [XOXXOOOXX]", function() {
        var tie = evaluator.isTie("XOXXOOOXX");
        tie.should.be.true;
    });
    it("should find a tie on tie board2 [OXOXOXXOX]", function() {
        var tie = evaluator.isTie("OXOXOXXOX");
        tie.should.be.true;
    });
    it("should find a tie on tie board3 [XXOOOXXOX]", function() {
        var tie = evaluator.isTie("XXOOOXXOX");
        tie.should.be.true;
    });
    it("should find a tie on tie board4 [OXXXOOOXX]", function() {
        var tie = evaluator.isTie("OXXXOOOXX");
        tie.should.be.true;
    });
});