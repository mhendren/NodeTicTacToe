/**
 * Created by mhendren on 3/4/15.
 */
/**
 * Created by mhendren on 2/21/15.
 */
var express = require('express');
var router = require('express').Router();

router.use(express.static(__dirname + "/../assets"));
router.use(express.static(__dirname + "/../templates"));
router.get('/', function(req, res) {
    var file = "/layout/tictactoe.html";
    res.sendFile(file, {root: __dirname + "/.."});
});

module.exports = router;