(function (exports) {
    var _boardSize = 9;

    function _winnerBySet(board, winners, posSet) {
        var returnWinners = winners;
        if (board.charAt(posSet[0]) == board.charAt(posSet[1]) && board.charAt(posSet[0]) == board.charAt(posSet[2]) && ['X', 'O'].indexOf(board.charAt(posSet[0])) != -1) {
            var winner = {
                player: board.charAt(posSet[0]),
                winAt: [posSet[0], posSet[1], posSet[2]]
            };
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

    /**
     * This will determine the set of winners on a layout layout (no validation)
     * @param layout
     * @returns {Array}
     */
    function winner(layout) {
        var winners = [];
        winners = _winnerByRow(layout, winners);
        winners = _winnerByColumn(layout, winners);
        winners = _winnerByDiagonal(layout, winners);
        return winners;
    }
    exports.winner = winner;

    function _isValidSize(layout) {
        return layout.length == _boardSize;

    }

    function _getBoardCounts(layout) {
        var counts = {X: 0, O: 0};
        for (var i = 0; i < layout.length; i++) {
            var square = layout.charAt(i);
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
        return !(counts.X != counts.O && counts.X != (counts.O + 1));
    }

    function _isValidWinners(layout) {
        var winners = winner(layout);
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

    /**
     * Determine if the layout is valid
     * @param layout
     * @returns {boolean}
     */
    function isValid(layout) {
        if (!_isValidSize(layout)) {
            throw new Error("Board size is not exactly " + _boardSize + " squares");
        }
        var counts = _getBoardCounts(layout);
        if (!_isValidCharactersOnBoard(counts)) {
            throw new Error("Invalid square in board");
        }
        if (!_isValidBalance(counts)) {
            throw new Error("Board is off balance");
        }
        if (!_isValidWinners(layout)) {
            throw new Error("Board contains more than one winner");
        }
        return true;
    }
    exports.isValid = isValid;

    /**
     * Determine if all squares in the layout are filled in
     * @param layout
     * @returns {boolean}
     */
    function isComplete(layout) {
        for(var i = 0; i < _boardSize; i++) {
            if (layout.charAt(i) != 'X' && layout.charAt(i) != 'O') {
                return false;
            }
        }
        return true;
    }
    exports.isComplete = isComplete;

    /**
     * Determine if the layout is a tie game
     * @param layout
     * @returns {boolean}
     */
    function isTie(layout) {
        if (!isComplete(layout)) {
            return false; // could still be a logical tie, but the game isn't officially over
        }
        var winners = winner(layout);
        return winners.length == 0;

    }
    exports.isTie = isTie;
})(this);