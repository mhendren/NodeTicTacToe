(function (exports) {
    var _boardSize = 9;

    function _winnerBySet(board, winners, posSet) {
        var returnWinners = winners;
        if (board.charAt(posSet[0]) == board.charAt(posSet[1]) && board.charAt(posSet[0]) == board.charAt(posSet[2]) && ['X', 'O'].indexOf(board.charAt(posSet[0])) != -1) {
            var winner = {
                player: board.charAt(posSet[0]),
                winAt: [posSet[0], posSet[1], posSet[2]]
            }
            returnWinners.push(winner);
        }
        return returnWinners;
    }

    function _winnerByRow(board, winners) {
        var returnWinners = winners;
        for (var i = 0; i < 3; i++) {
            var posSet = [i * 3, i * 3 + 1, i * 3 + 2];
            returnWinners = _winnerBySet(board, returnWinners, posSet);
        }
        return returnWinners;
    }

    function _winnerByColumn(board, winners) {
        var returnWinners = winners;
        for (var i = 0; i < 3; i++) {
            var posSet = [i, 3 + i, 6 + i];
            returnWinners = _winnerBySet(board, returnWinners, posSet);
        }
        return returnWinners;
    }

    function _winnerByDiagonal(board, winners) {
        var returnWinners = winners;
        returnWinners = _winnerBySet(board, returnWinners, [0, 4, 8]);
        returnWinners = _winnerBySet(board, returnWinners, [2, 4, 6]);
        return returnWinners;
    }

    function winner(board) {
        var winners = [];
        winners = _winnerByRow(board, winners);
        winners = _winnerByColumn(board, winners);
        winners = _winnerByDiagonal(board, winners);
        return winners;
    }
    exports.winner = winner;

    function _isValidSize(board) {
        return board.length == _boardSize;

    }

    function _getBoardCounts(board) {
        var counts = {X: 0, O: 0};
        for (var i = 0; i < board.length; i++) {
            var square = board.charAt(i);
            if (square in counts) {
                counts[square]++;
            } else {
                counts[square] = 0;
            }
        }
        return counts;
    }

    function _isValidCharactersOnBoard(counts) {
        for (var key in counts) {
            if (key != 'X' && key != 'O' && key != '-') {
                return false;
            }
        }
        return true;
    }

    function _isValidBalance(counts) {
        if (counts.X != counts.O && counts.X != (counts.O + 1)) {
            return false;
        }
        return true;
    }

    function _isValidWinners(board) {
        var winners = winner(board);
        if (winners.length > 1) {
            var knownWinner = winners[0].player;
            for(var i = 1; i < winners.length; i++) {
                if (winners[i].player != knownWinner) {
                    return false;
                }
            }
        }
        return true;
    }

    function isValid(board) {
        if (!_isValidSize(board)) {
            throw new Error("Board size is not exactly " + _boardSize + " squares");
        }
        var counts = _getBoardCounts(board);
        if (!_isValidCharactersOnBoard(counts)) {
            throw new Error("Invalid square in board");
        }
        if (!_isValidBalance(counts)) {
            throw new Error("Board is off balance");
        }
        if (!_isValidWinners(board)) {
            throw new Error("Board contains more than one winner");
        }
        return true;
    }
    exports.isValid = isValid;

    function isComplete(board) {
        for(var i = 0; i < _boardSize; i++) {
            if (board.charAt(i) != 'X' && board.charAt(i) != 'O') {
                return false;
            }
        }
        return true;
    }
    exports.isComplete = isComplete;

    function isTie(board) {
        if (!isComplete(board)) {
            return false; // could still be a logical tie, but the game isn't officially over
        }
        var winners = winner(board);
        return winners.length == 0;

    }
    exports.isTie = isTie;
})(this);