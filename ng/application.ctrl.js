/**
 * Created by mhendren on 3/5/15.
 */

app.controller('ApplicationCtrl', function($scope, $http) {
    console.log('in ApplicationCtrl');
    function setAllNull() {
        return [ null, null, null, null, null, null, null, null, null ];
    }

    function layoutToVals(layout) {
        var val = setAllNull();
        for(var i = 0; i < 9; i++) {
            val[i] = layout.substr(i, 1) == 'X' ? 'X' : layout.substr(i, 1) == 'O' ? 'O' : null;
        }
        return val;
    }

    function mm(data) {
        var msg = "";
        for (var d in data) {
            msg += d + ': ' + data[d] + '|';
        }
        $scope.message = msg;
        if (data.hasOwnProperty('currentPlayer')) {
            $scope.currentPlayer = data['currentPlayer'];
        }
        if (data.hasOwnProperty('layout')) {
            $scope.val = layoutToVals(data['layout']);
        }
    }

    $scope.init = function() {
        console.log('in init');
        $http.post('/game')
            .success(function(data) {
                mm(data);
            })
            .error(function(err) {
                $scope.message = err;
            });
        //$scope.message = "No Message Yet";
        //$scope.state = "Initialized";
        $scope.val = setAllNull();
    };

    $scope.setValue = function(row, column) {
        console.log('setValue called: ' + row + '\'' + column +'\'');
        $http.put('/game', {row: row, column: column})
            .success(function(data) {
                mm(data);
            })
            .error(function(err) {
                $scope.message = err;
            })
    };

    $scope.updatePlayer = function updatePlayer(player) {
        var playerType = player == 'X' ? $scope.playerX : $scope.playerO;
        console.log('updating player "' + player + '" to type "' + playerType + '"');
        $http.put('/game', {player: playerType.toLowerCase()})
            .success(function(data) {
                mm(data);
            })
            .error(function(err) {
                $scope.message = err;
            });
    };

    $scope.init();
});