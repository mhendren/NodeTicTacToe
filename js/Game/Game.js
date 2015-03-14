var Board = require("./Board.js");
var Player = require("./Player.js");
var Evaluator = require("./Evaluator.js");
var AI = require('../AI/AI');

module.exports = function() {

    var playerX = new Player("X");
    var playerO = new Player("O");
    var currentPlayer = playerX;
    var board = new Board();
    var errorMessage = null;
    var row = null;
    var column = null;
    var state = "inprogress";
    var winner = null;
    var winAt = null;


    function _switchPlayer() {
        if (currentPlayer === playerX) {
            currentPlayer = playerO;
        } else if (currentPlayer === playerO) {
            currentPlayer = playerX;
        }
    }

    function _makeStatus() {
        var evaluator = new Evaluator();
        if (evaluator.isTie(board.getLayout())) {
            state = "tie";
        } else {
            try {
                var winners = evaluator.winner(board.getLayout());
                if (winners.length > 0) {
                    state = "win";
                    winner = winners[0].player;
                    winAt = winners[0].winAt;
                }
            } catch (err) {
                errorMessage = err.essage;
            }
        }
    }

    function PlaceMark(r, c) {
        try {
            errorMessage = null;
            board.SetSquare(currentPlayer, parseInt(r), parseInt(c));
            row = r;
            column = c;
            _switchPlayer();
            _makeStatus();
            if(state == "inprogress" && currentPlayer.getPlayerType() == "computer") {
                new AI(this).play(currentPlayer);
            }
        } catch (err) {
            errorMessage = err.message;
        }
    }

    function ChangePlayerType(id, type) {
        try {
            errorMessage = null;
            if (id == "X") {
                playerX.setPlayerType(type);
            } else if (id == "O") {
                playerO.setPlayerType(type);
            } else {
                errorMessage = "Invalid player";
            }
            if (id == currentPlayer.getPlayer() && currentPlayer.getPlayerType() == "computer") {
                new AI(this).play(currentPlayer);
            }
        } catch (err) {
            errorMessage = err.message;
        }
    }


    function toJSON() {
        return {
            "X": playerX.getPlayerType(),
            "O": playerO.getPlayerType(),
            "currentPlayer": currentPlayer.getPlayer(),

            "row": row,
            "column": column,
            "layout": board.getLayout(),

            "state": state,
            "winner": winner,
            "winAt": winAt,

            "errorMessage": errorMessage
        };
    }

    return {
        "PlaceMark": PlaceMark,
        "ChangePlayerType": ChangePlayerType,
        "board": board,

        "toJSON": toJSON
    };
};