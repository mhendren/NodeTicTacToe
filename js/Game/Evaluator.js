module.exports = function() {
    var _boardSize = 9;

    function _winnerBySet(layout, winners, posSet) {
        var returnWinners = winners;
        if (layout.charAt(posSet[0]) == layout.charAt(posSet[1]) && layout.charAt(posSet[0]) == layout.charAt(posSet[2]) && ['X', 'O'].indexOf(layout.charAt(posSet[0])) != -1) {
            var winner = {
                player: layout.charAt(posSet[0]),
                winAt: [posSet[0], posSet[1], posSet[2]]
            };
            returnWinners.push(winner);
        }
        return returnWinners;
    }

    function _winnerByRow(layout, winners) {
        var returnWinners = winners;
        for (var i = 0; i < 3; i++) {
            var posSet = [i * 3, i * 3 + 1, i * 3 + 2];
            returnWinners = _winnerBySet(layout, returnWinners, posSet);
        }
        return returnWinners;
    }

    function _winnerByColumn(layout, winners) {
        var returnWinners = winners;
        for (var i = 0; i < 3; i++) {
            var posSet = [i, 3 + i, 6 + i];
            returnWinners = _winnerBySet(layout, returnWinners, posSet);
        }
        return returnWinners;
    }

    function _winnerByDiagonal(layout, winners) {
        var returnWinners = winners;
        returnWinners = _winnerBySet(layout, returnWinners, [0, 4, 8]);
        returnWinners = _winnerBySet(layout, returnWinners, [2, 4, 6]);
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
            for (var i = 1; i < winners.length; i++) {
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

    /**
     * Determine if all squares in the layout are filled in
     * @param layout
     * @returns {boolean}
     */
    function isComplete(layout) {
        for (var i = 0; i < _boardSize; i++) {
            if (layout.charAt(i) != 'X' && layout.charAt(i) != 'O') {
                return false;
            }
        }
        return true;
    }

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

    return {
        "winner": winner,
        "isValid": isValid,
        "isComplete": isComplete,
        "isTie": isTie
    };
};