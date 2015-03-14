/**
 * Created by mhendren on 3/5/15.
 */

app.controller('ApplicationCtrl', function($scope, $http) {
    console.log('in ApplicationCtrl');
    function setAllNull() {
        return [ null, null, null, null, null, null, null, null, null ];
    }

    function setAllToBlack() {
        return [ {color: 'black'}, {color: 'black'}, {color: 'black'}, {color: 'black'}, {color: 'black'},
            {color: 'black'}, {color: 'black'}, {color: 'black'}, {color: 'black'} ];
    }

    function layoutToVals(layout) {
        var val = setAllNull();
        for(var i = 0; i < 9; i++) {
            val[i] = layout.substr(i, 1) == 'X' ? 'X' : layout.substr(i, 1) == 'O' ? 'O' : null;
        }
        return val;
    }

    function setWinnerRed(scope) {
        if(scope.winAt) {
            for(var p in scope.winAt) {
                scope.styleval[scope.winAt[p]] = {'color': 'red', 'font-weight': 'bold'};
            }
        }
    }

    function setScopeVariable(scope, data, name, fieldName) {
        var dataFieldName = typeof fieldName === "undefined" ? name : fieldName;
        if (data.hasOwnProperty(dataFieldName)) {
            scope[name] = data[dataFieldName];
        }
    }

    function setupScopeVariables(scope, data) {
        function ssv(name, fieldName) {
            setScopeVariable(scope, data, name, fieldName);
        }
        ssv('currentPlayer');
        ssv('layout');
        ssv('state');
        ssv('winAt');
        ssv('winner');
        ssv('message', 'errorMessage');
    }

    function setVals(scope) {
        scope.val = layoutToVals(scope.layout);
    }

    function setWinnerDisplay(scope) {
        if (scope.winner) {
            scope.message = "Winner: " + scope.winner;
        }
        setWinnerRed(scope);
    }

    function updateState(scope, data) {
        setupScopeVariables(scope, data);
        setVals(scope);
        setWinnerDisplay(scope);
    }

    function initPlayers(scope, http) {
        function isEmpty(obj) {
            for(var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    return false;
                }
            }
            return true;
        }
        var players = {};
        if (scope.playerX) {
            players.X = scope.playerX.toLowerCase();
        }
        if (scope.playerO) {
            players.O = scope.playerO.toLowerCase();
        }
        if (!isEmpty(players)) {
            console.log('Setting up initial players: ' + JSON.stringify(players));
            http.put('/game', players)
                .error(function (err) {
                    scope.message = err;
                });
        }
    }

    $scope.init = function() {
        console.log('in init');
        $http.post('/game')
            .success(function(data) {
                $scope.message = null;
                updateState($scope, data);
                initPlayers($scope, $http);
                $scope.styleval = setAllToBlack();
            })
            .error(function(err) {
                $scope.message = err;
            });
        $scope.val = setAllNull();
    };

    $scope.setValue = function(row, column) {
        console.log('setValue called: ' + row + '\'' + column +'\': val['+ ((row*3)+column) +']: ' + $scope.val[(row*3)+column]);
        if ($scope.state == "inprogress" && $scope.val[(row*3)+column] == null) {
            $http.put('/game', {row: row, column: column})
                .success(function (data) {
                    updateState($scope, data);
                })
                .error(function (err) {
                    $scope.message = err;
                });
        }
    };

    $scope.updatePlayer = function updatePlayer(player) {
        var playerType = player == 'X' ? $scope.playerX : $scope.playerO;
        console.log('updating player "' + player + '" to type "' + playerType + '"');
        var data = {};
        data[player] = playerType.toLowerCase();
        $http.put('/game', data)
            .success(function(returnData) {
                updateState($scope, returnData);
            })
            .error(function(err) {
                $scope.message = err;
            });
    };

    $scope.init();
});