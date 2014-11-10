(function(exports){
    /**
     * The player. This is either the X or O player, and if it is human or computer.
     * @param player
     * @param playerType
     * @returns {{getPlayer: getPlayer, setPlayer: setPlayer, getPlayerType: getPlayerType, setPlayerType: setPlayerType}}
     * @constructor
     */
    function Player(player, playerType) {
        var _player = null;
        var _playerType = null;

        /**
         * Returns the player (X or O)
         * @returns {*}
         */
        function getPlayer() {
            return _player;
        }

        /**
         * Set the player (X, or O)
         * @param value
         */
        function setPlayer(value) {
            if (typeof value == "string" && ["X", "O"].indexOf(value) != -1) {
                _player = value;
            } else {
                throw new Error("Invalid player");
            }
        }

        /**
         * Return the player type (human or computer)
         * @returns {*}
         */
        function getPlayerType() {
            return _playerType;
        }

        /**
         * Set the player type (human or computer)
         * @param value
         */
        function setPlayerType(value) {
            if (typeof value == "string" && ["human", "computer"].indexOf(value) != -1) {
                _playerType = value;
            } else {
                throw new Error("Invalid player type");
            }
        }

        if (player !== undefined) {
            setPlayer(player);
        }
        if (playerType !== undefined) {
            setPlayerType(playerType);
        }

        return {
            getPlayer: getPlayer,
            setPlayer: setPlayer,
            getPlayerType: getPlayerType,
            setPlayerType: setPlayerType
        };
    }
    exports.Player = Player;
})(this);