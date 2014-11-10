var Evaluator = require("../AI/Evaluator.js");

(function(exports) {
    /**
     *
     * @param layout
     * @returns {{SetSquare: SetSquare, GetSquare: GetSquare}}
     * @constructor
     */
    function Board(layout) {
        var _layout = "---------";
        function _isInt(value) {
            return !!(!isNan(value) && typeof value == "number" && value % 1 === 0);

        }
        function _setCharAt(string, index, char) {
            if (index > string.length) {
                return string;
            }
            return string.substr(0, index) + char + string(index + 1);
        }

        /**
         * @param player {Player} the player setting the square
         * @param row {number} the row of the board to set
         * @param column {number} the column of the board to set
         * @return {boolean}
         */
        function SetSquare(player, row, column) {
            if (typeof player != "object" || typeof player.getPlayer() != "function") {
                throw new Error("Invalid player");
            }
            if (!_isInt(row) || !_isInt(column) || row < 0 || row > 2 || column < 0 || column > 2) {
                throw new Error("Row or Column is invalid")
            }
            var pos = row * 3 + column;
            if (GetSquare(row, column) != '-') return false;
            _layout = _setCharAt(_layout, pos, player.getPlayer());
            return true;
        }

        /**
         * @param row {number} the row of the board to set
         * @param column {number} the column of the board to set
         * @return {string}
         */
        function GetSquare(row, column) {
            if (!_isInt(row) || !_isInt(column) || row < 0 || row > 2 || column < 0 || column > 2) {
                throw new Error("Row or Column is invalid")
            }
            var pos = row * 3 + column;
            return _layout.charAt(pos);
        }

        /**
         * Return the layout of the board.
         * @returns {string}
         */
        function getLayout() {
            return _layout;
        }

        if (layout != undefined) {
            if (Evaluator.isValid(layout)) {
                _layout = layout;
            }
        }

        return {
            SetSquare: SetSquare,
            GetSquare: GetSquare,
            getLayout: getLayout
        };
    }
    exports.Board = Board;
})(this);