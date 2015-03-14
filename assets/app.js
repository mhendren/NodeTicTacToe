/**
 * Created by mhendren on 3/4/15.
 */
var app = angular.module('app', []);
/**
 * Created by mhendren on 3/5/15.
 */

app.controller('ApplicationCtrl', ["$scope", "$http", function($scope, $http) {
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
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsImFwcGxpY2F0aW9uLmN0cmwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQUdBLElBQUEsTUFBQSxRQUFBLE9BQUEsT0FBQTs7Ozs7QUNDQSxJQUFBLFdBQUEsdUNBQUEsU0FBQSxRQUFBLE9BQUE7SUFDQSxRQUFBLElBQUE7SUFDQSxTQUFBLGFBQUE7UUFDQSxPQUFBLEVBQUEsTUFBQSxNQUFBLE1BQUEsTUFBQSxNQUFBLE1BQUEsTUFBQSxNQUFBOzs7SUFHQSxTQUFBLGdCQUFBO1FBQ0EsT0FBQSxFQUFBLENBQUEsT0FBQSxVQUFBLENBQUEsT0FBQSxVQUFBLENBQUEsT0FBQSxVQUFBLENBQUEsT0FBQSxVQUFBLENBQUEsT0FBQTtZQUNBLENBQUEsT0FBQSxVQUFBLENBQUEsT0FBQSxVQUFBLENBQUEsT0FBQSxVQUFBLENBQUEsT0FBQTs7O0lBR0EsU0FBQSxhQUFBLFFBQUE7UUFDQSxJQUFBLE1BQUE7UUFDQSxJQUFBLElBQUEsSUFBQSxHQUFBLElBQUEsR0FBQSxLQUFBO1lBQ0EsSUFBQSxLQUFBLE9BQUEsT0FBQSxHQUFBLE1BQUEsTUFBQSxNQUFBLE9BQUEsT0FBQSxHQUFBLE1BQUEsTUFBQSxNQUFBOztRQUVBLE9BQUE7OztJQUdBLFNBQUEsYUFBQSxPQUFBO1FBQ0EsR0FBQSxNQUFBLE9BQUE7WUFDQSxJQUFBLElBQUEsS0FBQSxNQUFBLE9BQUE7Z0JBQ0EsTUFBQSxTQUFBLE1BQUEsTUFBQSxNQUFBLENBQUEsU0FBQSxPQUFBLGVBQUE7Ozs7O0lBS0EsU0FBQSxpQkFBQSxPQUFBLE1BQUEsTUFBQSxXQUFBO1FBQ0EsSUFBQSxnQkFBQSxPQUFBLGNBQUEsY0FBQSxPQUFBO1FBQ0EsSUFBQSxLQUFBLGVBQUEsZ0JBQUE7WUFDQSxNQUFBLFFBQUEsS0FBQTs7OztJQUlBLFNBQUEsb0JBQUEsT0FBQSxNQUFBO1FBQ0EsU0FBQSxJQUFBLE1BQUEsV0FBQTtZQUNBLGlCQUFBLE9BQUEsTUFBQSxNQUFBOztRQUVBLElBQUE7UUFDQSxJQUFBO1FBQ0EsSUFBQTtRQUNBLElBQUE7UUFDQSxJQUFBO1FBQ0EsSUFBQSxXQUFBOzs7SUFHQSxTQUFBLFFBQUEsT0FBQTtRQUNBLE1BQUEsTUFBQSxhQUFBLE1BQUE7OztJQUdBLFNBQUEsaUJBQUEsT0FBQTtRQUNBLElBQUEsTUFBQSxRQUFBO1lBQ0EsTUFBQSxVQUFBLGFBQUEsTUFBQTs7UUFFQSxhQUFBOzs7SUFHQSxTQUFBLFlBQUEsT0FBQSxNQUFBO1FBQ0Esb0JBQUEsT0FBQTtRQUNBLFFBQUE7UUFDQSxpQkFBQTs7O0lBR0EsU0FBQSxZQUFBLE9BQUEsTUFBQTtRQUNBLFNBQUEsUUFBQSxLQUFBO1lBQ0EsSUFBQSxJQUFBLFFBQUEsS0FBQTtnQkFDQSxJQUFBLElBQUEsZUFBQSxPQUFBO29CQUNBLE9BQUE7OztZQUdBLE9BQUE7O1FBRUEsSUFBQSxVQUFBO1FBQ0EsSUFBQSxNQUFBLFNBQUE7WUFDQSxRQUFBLElBQUEsTUFBQSxRQUFBOztRQUVBLElBQUEsTUFBQSxTQUFBO1lBQ0EsUUFBQSxJQUFBLE1BQUEsUUFBQTs7UUFFQSxJQUFBLENBQUEsUUFBQSxVQUFBO1lBQ0EsUUFBQSxJQUFBLGlDQUFBLEtBQUEsVUFBQTtZQUNBLEtBQUEsSUFBQSxTQUFBO2lCQUNBLE1BQUEsVUFBQSxLQUFBO29CQUNBLE1BQUEsVUFBQTs7Ozs7SUFLQSxPQUFBLE9BQUEsV0FBQTtRQUNBLFFBQUEsSUFBQTtRQUNBLE1BQUEsS0FBQTthQUNBLFFBQUEsU0FBQSxNQUFBO2dCQUNBLE9BQUEsVUFBQTtnQkFDQSxZQUFBLFFBQUE7Z0JBQ0EsWUFBQSxRQUFBO2dCQUNBLE9BQUEsV0FBQTs7YUFFQSxNQUFBLFNBQUEsS0FBQTtnQkFDQSxPQUFBLFVBQUE7O1FBRUEsT0FBQSxNQUFBOzs7SUFHQSxPQUFBLFdBQUEsU0FBQSxLQUFBLFFBQUE7UUFDQSxRQUFBLElBQUEsc0JBQUEsTUFBQSxPQUFBLFFBQUEsYUFBQSxDQUFBLElBQUEsR0FBQSxTQUFBLFFBQUEsT0FBQSxJQUFBLENBQUEsSUFBQSxHQUFBO1FBQ0EsSUFBQSxPQUFBLFNBQUEsZ0JBQUEsT0FBQSxJQUFBLENBQUEsSUFBQSxHQUFBLFdBQUEsTUFBQTtZQUNBLE1BQUEsSUFBQSxTQUFBLENBQUEsS0FBQSxLQUFBLFFBQUE7aUJBQ0EsUUFBQSxVQUFBLE1BQUE7b0JBQ0EsWUFBQSxRQUFBOztpQkFFQSxNQUFBLFVBQUEsS0FBQTtvQkFDQSxPQUFBLFVBQUE7Ozs7O0lBS0EsT0FBQSxlQUFBLFNBQUEsYUFBQSxRQUFBO1FBQ0EsSUFBQSxhQUFBLFVBQUEsTUFBQSxPQUFBLFVBQUEsT0FBQTtRQUNBLFFBQUEsSUFBQSxzQkFBQSxTQUFBLGdCQUFBLGFBQUE7UUFDQSxJQUFBLE9BQUE7UUFDQSxLQUFBLFVBQUEsV0FBQTtRQUNBLE1BQUEsSUFBQSxTQUFBO2FBQ0EsUUFBQSxTQUFBLFlBQUE7Z0JBQ0EsWUFBQSxRQUFBOzthQUVBLE1BQUEsU0FBQSxLQUFBO2dCQUNBLE9BQUEsVUFBQTs7OztJQUlBLE9BQUE7SUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgbWhlbmRyZW4gb24gMy80LzE1LlxuICovXG52YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFtdKTsiLCIvKipcbiAqIENyZWF0ZWQgYnkgbWhlbmRyZW4gb24gMy81LzE1LlxuICovXG5cbmFwcC5jb250cm9sbGVyKCdBcHBsaWNhdGlvbkN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRodHRwKSB7XG4gICAgY29uc29sZS5sb2coJ2luIEFwcGxpY2F0aW9uQ3RybCcpO1xuICAgIGZ1bmN0aW9uIHNldEFsbE51bGwoKSB7XG4gICAgICAgIHJldHVybiBbIG51bGwsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIG51bGwsIG51bGwgXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRBbGxUb0JsYWNrKCkge1xuICAgICAgICByZXR1cm4gWyB7Y29sb3I6ICdibGFjayd9LCB7Y29sb3I6ICdibGFjayd9LCB7Y29sb3I6ICdibGFjayd9LCB7Y29sb3I6ICdibGFjayd9LCB7Y29sb3I6ICdibGFjayd9LFxuICAgICAgICAgICAge2NvbG9yOiAnYmxhY2snfSwge2NvbG9yOiAnYmxhY2snfSwge2NvbG9yOiAnYmxhY2snfSwge2NvbG9yOiAnYmxhY2snfSBdO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxheW91dFRvVmFscyhsYXlvdXQpIHtcbiAgICAgICAgdmFyIHZhbCA9IHNldEFsbE51bGwoKTtcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IDk7IGkrKykge1xuICAgICAgICAgICAgdmFsW2ldID0gbGF5b3V0LnN1YnN0cihpLCAxKSA9PSAnWCcgPyAnWCcgOiBsYXlvdXQuc3Vic3RyKGksIDEpID09ICdPJyA/ICdPJyA6IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRXaW5uZXJSZWQoc2NvcGUpIHtcbiAgICAgICAgaWYoc2NvcGUud2luQXQpIHtcbiAgICAgICAgICAgIGZvcih2YXIgcCBpbiBzY29wZS53aW5BdCkge1xuICAgICAgICAgICAgICAgIHNjb3BlLnN0eWxldmFsW3Njb3BlLndpbkF0W3BdXSA9IHsnY29sb3InOiAncmVkJywgJ2ZvbnQtd2VpZ2h0JzogJ2JvbGQnfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldFNjb3BlVmFyaWFibGUoc2NvcGUsIGRhdGEsIG5hbWUsIGZpZWxkTmFtZSkge1xuICAgICAgICB2YXIgZGF0YUZpZWxkTmFtZSA9IHR5cGVvZiBmaWVsZE5hbWUgPT09IFwidW5kZWZpbmVkXCIgPyBuYW1lIDogZmllbGROYW1lO1xuICAgICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShkYXRhRmllbGROYW1lKSkge1xuICAgICAgICAgICAgc2NvcGVbbmFtZV0gPSBkYXRhW2RhdGFGaWVsZE5hbWVdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0dXBTY29wZVZhcmlhYmxlcyhzY29wZSwgZGF0YSkge1xuICAgICAgICBmdW5jdGlvbiBzc3YobmFtZSwgZmllbGROYW1lKSB7XG4gICAgICAgICAgICBzZXRTY29wZVZhcmlhYmxlKHNjb3BlLCBkYXRhLCBuYW1lLCBmaWVsZE5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHNzdignY3VycmVudFBsYXllcicpO1xuICAgICAgICBzc3YoJ2xheW91dCcpO1xuICAgICAgICBzc3YoJ3N0YXRlJyk7XG4gICAgICAgIHNzdignd2luQXQnKTtcbiAgICAgICAgc3N2KCd3aW5uZXInKTtcbiAgICAgICAgc3N2KCdtZXNzYWdlJywgJ2Vycm9yTWVzc2FnZScpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldFZhbHMoc2NvcGUpIHtcbiAgICAgICAgc2NvcGUudmFsID0gbGF5b3V0VG9WYWxzKHNjb3BlLmxheW91dCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0V2lubmVyRGlzcGxheShzY29wZSkge1xuICAgICAgICBpZiAoc2NvcGUud2lubmVyKSB7XG4gICAgICAgICAgICBzY29wZS5tZXNzYWdlID0gXCJXaW5uZXI6IFwiICsgc2NvcGUud2lubmVyO1xuICAgICAgICB9XG4gICAgICAgIHNldFdpbm5lclJlZChzY29wZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlU3RhdGUoc2NvcGUsIGRhdGEpIHtcbiAgICAgICAgc2V0dXBTY29wZVZhcmlhYmxlcyhzY29wZSwgZGF0YSk7XG4gICAgICAgIHNldFZhbHMoc2NvcGUpO1xuICAgICAgICBzZXRXaW5uZXJEaXNwbGF5KHNjb3BlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0UGxheWVycyhzY29wZSwgaHR0cCkge1xuICAgICAgICBmdW5jdGlvbiBpc0VtcHR5KG9iaikge1xuICAgICAgICAgICAgZm9yKHZhciBwcm9wIGluIG9iaikge1xuICAgICAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBwbGF5ZXJzID0ge307XG4gICAgICAgIGlmIChzY29wZS5wbGF5ZXJYKSB7XG4gICAgICAgICAgICBwbGF5ZXJzLlggPSBzY29wZS5wbGF5ZXJYLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjb3BlLnBsYXllck8pIHtcbiAgICAgICAgICAgIHBsYXllcnMuTyA9IHNjb3BlLnBsYXllck8udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzRW1wdHkocGxheWVycykpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTZXR0aW5nIHVwIGluaXRpYWwgcGxheWVyczogJyArIEpTT04uc3RyaW5naWZ5KHBsYXllcnMpKTtcbiAgICAgICAgICAgIGh0dHAucHV0KCcvZ2FtZScsIHBsYXllcnMpXG4gICAgICAgICAgICAgICAgLmVycm9yKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUubWVzc2FnZSA9IGVycjtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICRzY29wZS5pbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdpbiBpbml0Jyk7XG4gICAgICAgICRodHRwLnBvc3QoJy9nYW1lJylcbiAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUubWVzc2FnZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgdXBkYXRlU3RhdGUoJHNjb3BlLCBkYXRhKTtcbiAgICAgICAgICAgICAgICBpbml0UGxheWVycygkc2NvcGUsICRodHRwKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuc3R5bGV2YWwgPSBzZXRBbGxUb0JsYWNrKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmVycm9yKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICRzY29wZS5tZXNzYWdlID0gZXJyO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICRzY29wZS52YWwgPSBzZXRBbGxOdWxsKCk7XG4gICAgfTtcblxuICAgICRzY29wZS5zZXRWYWx1ZSA9IGZ1bmN0aW9uKHJvdywgY29sdW1uKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzZXRWYWx1ZSBjYWxsZWQ6ICcgKyByb3cgKyAnXFwnJyArIGNvbHVtbiArJ1xcJzogdmFsWycrICgocm93KjMpK2NvbHVtbikgKyddOiAnICsgJHNjb3BlLnZhbFsocm93KjMpK2NvbHVtbl0pO1xuICAgICAgICBpZiAoJHNjb3BlLnN0YXRlID09IFwiaW5wcm9ncmVzc1wiICYmICRzY29wZS52YWxbKHJvdyozKStjb2x1bW5dID09IG51bGwpIHtcbiAgICAgICAgICAgICRodHRwLnB1dCgnL2dhbWUnLCB7cm93OiByb3csIGNvbHVtbjogY29sdW1ufSlcbiAgICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVTdGF0ZSgkc2NvcGUsIGRhdGEpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmVycm9yKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm1lc3NhZ2UgPSBlcnI7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgJHNjb3BlLnVwZGF0ZVBsYXllciA9IGZ1bmN0aW9uIHVwZGF0ZVBsYXllcihwbGF5ZXIpIHtcbiAgICAgICAgdmFyIHBsYXllclR5cGUgPSBwbGF5ZXIgPT0gJ1gnID8gJHNjb3BlLnBsYXllclggOiAkc2NvcGUucGxheWVyTztcbiAgICAgICAgY29uc29sZS5sb2coJ3VwZGF0aW5nIHBsYXllciBcIicgKyBwbGF5ZXIgKyAnXCIgdG8gdHlwZSBcIicgKyBwbGF5ZXJUeXBlICsgJ1wiJyk7XG4gICAgICAgIHZhciBkYXRhID0ge307XG4gICAgICAgIGRhdGFbcGxheWVyXSA9IHBsYXllclR5cGUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgJGh0dHAucHV0KCcvZ2FtZScsIGRhdGEpXG4gICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihyZXR1cm5EYXRhKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlU3RhdGUoJHNjb3BlLCByZXR1cm5EYXRhKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZXJyb3IoZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLm1lc3NhZ2UgPSBlcnI7XG4gICAgICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLmluaXQoKTtcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==