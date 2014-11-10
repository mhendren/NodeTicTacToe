(function(exports){
    function Player(player, playerType) {
        var _player = null;
        var _playerType = null;

        function getPlayer() {
            return _player;
        }
        function setPlayer(value) {
            if (typeof value == "string" && (value == "X" || value == "O")) {
                _player = value;
            } else {
                throw new Error("Invalid player");
            }
        }

        function getPlayerType() {
            return _playerType;
        }
        function setPlayerType(value) {
            if (typeof value == "string" && value == "human" && value == "computer") {
                _playerType = value;
            } else {
                throw new Error("Invalid player type");
            }
        }

        setPlayer(player);
        setPlayerType(playerType);

        return {
            getPlayer: getPlayer,
            setPlayer: setPlayer,
            getPlayerType: getPlayerType,
            setPlayerType: setPlayerType
        };
    }
    exports.Player = Player;
})(this);