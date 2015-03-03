var express = require('express');
var router = express.Router();
var Game = require("../js/Game/Game.js");

var game = new Game();

function noGame() {
    return {
        "message": "No game in progress"
    };
}

router.route('/')
    /* GET current board. */
    .get(function(req, res) {
        var result = game == null ? noGame() : game.toJSON();
        res.json(result);
    })
    /* POST create a new board */
    .post(function(req, res) {
        game = new Game();
        res.json(game.toJSON());
    })
    /* PUT change some game state */
    .put(function(req, res) {
        var X = typeof req.body.X !== "undefined" ? req.body.X : game.toJSON().X;
        var O = typeof req.body.O !== "undefined" ? req.body.O : game.toJSON().O;
        if (X != game.toJSON().X) {
            game.ChangePlayerType("X", X);
        }
        if (O != game.toJSON().O) {
            game.ChangePlayerType("O", O);
        }
        var row = typeof req.body.row !== "undefined" ? req.body.row : null;
        var column = typeof req.body.column !== "undefined" ? req.body.column : null;
        if (row != null && column != null) {
            game.PlaceMark(row, column);
        }
        res.json(game.toJSON());
    })
    /* DELETE stop a game running */
    .delete(function(req, res) {
        game = null;
        res.json(noGame());
    });

module.exports = router;