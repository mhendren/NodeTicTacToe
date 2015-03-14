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
                .success(function(data) {
                    updateState(scope, data);
                })
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsImFwcGxpY2F0aW9uLmN0cmwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQUdBLElBQUEsTUFBQSxRQUFBLE9BQUEsT0FBQTs7Ozs7QUNDQSxJQUFBLFdBQUEsdUNBQUEsU0FBQSxRQUFBLE9BQUE7SUFDQSxRQUFBLElBQUE7SUFDQSxTQUFBLGFBQUE7UUFDQSxPQUFBLEVBQUEsTUFBQSxNQUFBLE1BQUEsTUFBQSxNQUFBLE1BQUEsTUFBQSxNQUFBOzs7SUFHQSxTQUFBLGdCQUFBO1FBQ0EsT0FBQSxFQUFBLENBQUEsT0FBQSxVQUFBLENBQUEsT0FBQSxVQUFBLENBQUEsT0FBQSxVQUFBLENBQUEsT0FBQSxVQUFBLENBQUEsT0FBQTtZQUNBLENBQUEsT0FBQSxVQUFBLENBQUEsT0FBQSxVQUFBLENBQUEsT0FBQSxVQUFBLENBQUEsT0FBQTs7O0lBR0EsU0FBQSxhQUFBLFFBQUE7UUFDQSxJQUFBLE1BQUE7UUFDQSxJQUFBLElBQUEsSUFBQSxHQUFBLElBQUEsR0FBQSxLQUFBO1lBQ0EsSUFBQSxLQUFBLE9BQUEsT0FBQSxHQUFBLE1BQUEsTUFBQSxNQUFBLE9BQUEsT0FBQSxHQUFBLE1BQUEsTUFBQSxNQUFBOztRQUVBLE9BQUE7OztJQUdBLFNBQUEsYUFBQSxPQUFBO1FBQ0EsR0FBQSxNQUFBLE9BQUE7WUFDQSxJQUFBLElBQUEsS0FBQSxNQUFBLE9BQUE7Z0JBQ0EsTUFBQSxTQUFBLE1BQUEsTUFBQSxNQUFBLENBQUEsU0FBQSxPQUFBLGVBQUE7Ozs7O0lBS0EsU0FBQSxpQkFBQSxPQUFBLE1BQUEsTUFBQSxXQUFBO1FBQ0EsSUFBQSxnQkFBQSxPQUFBLGNBQUEsY0FBQSxPQUFBO1FBQ0EsSUFBQSxLQUFBLGVBQUEsZ0JBQUE7WUFDQSxNQUFBLFFBQUEsS0FBQTs7OztJQUlBLFNBQUEsb0JBQUEsT0FBQSxNQUFBO1FBQ0EsU0FBQSxJQUFBLE1BQUEsV0FBQTtZQUNBLGlCQUFBLE9BQUEsTUFBQSxNQUFBOztRQUVBLElBQUE7UUFDQSxJQUFBO1FBQ0EsSUFBQTtRQUNBLElBQUE7UUFDQSxJQUFBO1FBQ0EsSUFBQSxXQUFBOzs7SUFHQSxTQUFBLFFBQUEsT0FBQTtRQUNBLE1BQUEsTUFBQSxhQUFBLE1BQUE7OztJQUdBLFNBQUEsaUJBQUEsT0FBQTtRQUNBLElBQUEsTUFBQSxRQUFBO1lBQ0EsTUFBQSxVQUFBLGFBQUEsTUFBQTs7UUFFQSxhQUFBOzs7SUFHQSxTQUFBLFlBQUEsT0FBQSxNQUFBO1FBQ0Esb0JBQUEsT0FBQTtRQUNBLFFBQUE7UUFDQSxpQkFBQTs7O0lBR0EsU0FBQSxZQUFBLE9BQUEsTUFBQTtRQUNBLFNBQUEsUUFBQSxLQUFBO1lBQ0EsSUFBQSxJQUFBLFFBQUEsS0FBQTtnQkFDQSxJQUFBLElBQUEsZUFBQSxPQUFBO29CQUNBLE9BQUE7OztZQUdBLE9BQUE7O1FBRUEsSUFBQSxVQUFBO1FBQ0EsSUFBQSxNQUFBLFNBQUE7WUFDQSxRQUFBLElBQUEsTUFBQSxRQUFBOztRQUVBLElBQUEsTUFBQSxTQUFBO1lBQ0EsUUFBQSxJQUFBLE1BQUEsUUFBQTs7UUFFQSxJQUFBLENBQUEsUUFBQSxVQUFBO1lBQ0EsUUFBQSxJQUFBLGlDQUFBLEtBQUEsVUFBQTtZQUNBLEtBQUEsSUFBQSxTQUFBO2lCQUNBLFFBQUEsU0FBQSxNQUFBO29CQUNBLFlBQUEsT0FBQTs7aUJBRUEsTUFBQSxVQUFBLEtBQUE7b0JBQ0EsTUFBQSxVQUFBOzs7OztJQUtBLE9BQUEsT0FBQSxXQUFBO1FBQ0EsUUFBQSxJQUFBO1FBQ0EsTUFBQSxLQUFBO2FBQ0EsUUFBQSxTQUFBLE1BQUE7Z0JBQ0EsT0FBQSxVQUFBO2dCQUNBLFlBQUEsUUFBQTtnQkFDQSxZQUFBLFFBQUE7Z0JBQ0EsT0FBQSxXQUFBOzthQUVBLE1BQUEsU0FBQSxLQUFBO2dCQUNBLE9BQUEsVUFBQTs7UUFFQSxPQUFBLE1BQUE7OztJQUdBLE9BQUEsV0FBQSxTQUFBLEtBQUEsUUFBQTtRQUNBLFFBQUEsSUFBQSxzQkFBQSxNQUFBLE9BQUEsUUFBQSxhQUFBLENBQUEsSUFBQSxHQUFBLFNBQUEsUUFBQSxPQUFBLElBQUEsQ0FBQSxJQUFBLEdBQUE7UUFDQSxJQUFBLE9BQUEsU0FBQSxnQkFBQSxPQUFBLElBQUEsQ0FBQSxJQUFBLEdBQUEsV0FBQSxNQUFBO1lBQ0EsTUFBQSxJQUFBLFNBQUEsQ0FBQSxLQUFBLEtBQUEsUUFBQTtpQkFDQSxRQUFBLFVBQUEsTUFBQTtvQkFDQSxZQUFBLFFBQUE7O2lCQUVBLE1BQUEsVUFBQSxLQUFBO29CQUNBLE9BQUEsVUFBQTs7Ozs7SUFLQSxPQUFBLGVBQUEsU0FBQSxhQUFBLFFBQUE7UUFDQSxJQUFBLGFBQUEsVUFBQSxNQUFBLE9BQUEsVUFBQSxPQUFBO1FBQ0EsUUFBQSxJQUFBLHNCQUFBLFNBQUEsZ0JBQUEsYUFBQTtRQUNBLElBQUEsT0FBQTtRQUNBLEtBQUEsVUFBQSxXQUFBO1FBQ0EsTUFBQSxJQUFBLFNBQUE7YUFDQSxRQUFBLFNBQUEsWUFBQTtnQkFDQSxZQUFBLFFBQUE7O2FBRUEsTUFBQSxTQUFBLEtBQUE7Z0JBQ0EsT0FBQSxVQUFBOzs7O0lBSUEsT0FBQTtJQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBtaGVuZHJlbiBvbiAzLzQvMTUuXG4gKi9cbnZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnYXBwJywgW10pOyIsIi8qKlxuICogQ3JlYXRlZCBieSBtaGVuZHJlbiBvbiAzLzUvMTUuXG4gKi9cblxuYXBwLmNvbnRyb2xsZXIoJ0FwcGxpY2F0aW9uQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJGh0dHApIHtcbiAgICBjb25zb2xlLmxvZygnaW4gQXBwbGljYXRpb25DdHJsJyk7XG4gICAgZnVuY3Rpb24gc2V0QWxsTnVsbCgpIHtcbiAgICAgICAgcmV0dXJuIFsgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCBdO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldEFsbFRvQmxhY2soKSB7XG4gICAgICAgIHJldHVybiBbIHtjb2xvcjogJ2JsYWNrJ30sIHtjb2xvcjogJ2JsYWNrJ30sIHtjb2xvcjogJ2JsYWNrJ30sIHtjb2xvcjogJ2JsYWNrJ30sIHtjb2xvcjogJ2JsYWNrJ30sXG4gICAgICAgICAgICB7Y29sb3I6ICdibGFjayd9LCB7Y29sb3I6ICdibGFjayd9LCB7Y29sb3I6ICdibGFjayd9LCB7Y29sb3I6ICdibGFjayd9IF07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGF5b3V0VG9WYWxzKGxheW91dCkge1xuICAgICAgICB2YXIgdmFsID0gc2V0QWxsTnVsbCgpO1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgOTsgaSsrKSB7XG4gICAgICAgICAgICB2YWxbaV0gPSBsYXlvdXQuc3Vic3RyKGksIDEpID09ICdYJyA/ICdYJyA6IGxheW91dC5zdWJzdHIoaSwgMSkgPT0gJ08nID8gJ08nIDogbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldFdpbm5lclJlZChzY29wZSkge1xuICAgICAgICBpZihzY29wZS53aW5BdCkge1xuICAgICAgICAgICAgZm9yKHZhciBwIGluIHNjb3BlLndpbkF0KSB7XG4gICAgICAgICAgICAgICAgc2NvcGUuc3R5bGV2YWxbc2NvcGUud2luQXRbcF1dID0geydjb2xvcic6ICdyZWQnLCAnZm9udC13ZWlnaHQnOiAnYm9sZCd9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0U2NvcGVWYXJpYWJsZShzY29wZSwgZGF0YSwgbmFtZSwgZmllbGROYW1lKSB7XG4gICAgICAgIHZhciBkYXRhRmllbGROYW1lID0gdHlwZW9mIGZpZWxkTmFtZSA9PT0gXCJ1bmRlZmluZWRcIiA/IG5hbWUgOiBmaWVsZE5hbWU7XG4gICAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KGRhdGFGaWVsZE5hbWUpKSB7XG4gICAgICAgICAgICBzY29wZVtuYW1lXSA9IGRhdGFbZGF0YUZpZWxkTmFtZV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXR1cFNjb3BlVmFyaWFibGVzKHNjb3BlLCBkYXRhKSB7XG4gICAgICAgIGZ1bmN0aW9uIHNzdihuYW1lLCBmaWVsZE5hbWUpIHtcbiAgICAgICAgICAgIHNldFNjb3BlVmFyaWFibGUoc2NvcGUsIGRhdGEsIG5hbWUsIGZpZWxkTmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgc3N2KCdjdXJyZW50UGxheWVyJyk7XG4gICAgICAgIHNzdignbGF5b3V0Jyk7XG4gICAgICAgIHNzdignc3RhdGUnKTtcbiAgICAgICAgc3N2KCd3aW5BdCcpO1xuICAgICAgICBzc3YoJ3dpbm5lcicpO1xuICAgICAgICBzc3YoJ21lc3NhZ2UnLCAnZXJyb3JNZXNzYWdlJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0VmFscyhzY29wZSkge1xuICAgICAgICBzY29wZS52YWwgPSBsYXlvdXRUb1ZhbHMoc2NvcGUubGF5b3V0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRXaW5uZXJEaXNwbGF5KHNjb3BlKSB7XG4gICAgICAgIGlmIChzY29wZS53aW5uZXIpIHtcbiAgICAgICAgICAgIHNjb3BlLm1lc3NhZ2UgPSBcIldpbm5lcjogXCIgKyBzY29wZS53aW5uZXI7XG4gICAgICAgIH1cbiAgICAgICAgc2V0V2lubmVyUmVkKHNjb3BlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVTdGF0ZShzY29wZSwgZGF0YSkge1xuICAgICAgICBzZXR1cFNjb3BlVmFyaWFibGVzKHNjb3BlLCBkYXRhKTtcbiAgICAgICAgc2V0VmFscyhzY29wZSk7XG4gICAgICAgIHNldFdpbm5lckRpc3BsYXkoc2NvcGUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluaXRQbGF5ZXJzKHNjb3BlLCBodHRwKSB7XG4gICAgICAgIGZ1bmN0aW9uIGlzRW1wdHkob2JqKSB7XG4gICAgICAgICAgICBmb3IodmFyIHByb3AgaW4gb2JqKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHBsYXllcnMgPSB7fTtcbiAgICAgICAgaWYgKHNjb3BlLnBsYXllclgpIHtcbiAgICAgICAgICAgIHBsYXllcnMuWCA9IHNjb3BlLnBsYXllclgudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2NvcGUucGxheWVyTykge1xuICAgICAgICAgICAgcGxheWVycy5PID0gc2NvcGUucGxheWVyTy50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNFbXB0eShwbGF5ZXJzKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1NldHRpbmcgdXAgaW5pdGlhbCBwbGF5ZXJzOiAnICsgSlNPTi5zdHJpbmdpZnkocGxheWVycykpO1xuICAgICAgICAgICAgaHR0cC5wdXQoJy9nYW1lJywgcGxheWVycylcbiAgICAgICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZVN0YXRlKHNjb3BlLCBkYXRhKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5lcnJvcihmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLm1lc3NhZ2UgPSBlcnI7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAkc2NvcGUuaW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnaW4gaW5pdCcpO1xuICAgICAgICAkaHR0cC5wb3N0KCcvZ2FtZScpXG4gICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLm1lc3NhZ2UgPSBudWxsO1xuICAgICAgICAgICAgICAgIHVwZGF0ZVN0YXRlKCRzY29wZSwgZGF0YSk7XG4gICAgICAgICAgICAgICAgaW5pdFBsYXllcnMoJHNjb3BlLCAkaHR0cCk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnN0eWxldmFsID0gc2V0QWxsVG9CbGFjaygpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5lcnJvcihmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUubWVzc2FnZSA9IGVycjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAkc2NvcGUudmFsID0gc2V0QWxsTnVsbCgpO1xuICAgIH07XG5cbiAgICAkc2NvcGUuc2V0VmFsdWUgPSBmdW5jdGlvbihyb3csIGNvbHVtbikge1xuICAgICAgICBjb25zb2xlLmxvZygnc2V0VmFsdWUgY2FsbGVkOiAnICsgcm93ICsgJ1xcJycgKyBjb2x1bW4gKydcXCc6IHZhbFsnKyAoKHJvdyozKStjb2x1bW4pICsnXTogJyArICRzY29wZS52YWxbKHJvdyozKStjb2x1bW5dKTtcbiAgICAgICAgaWYgKCRzY29wZS5zdGF0ZSA9PSBcImlucHJvZ3Jlc3NcIiAmJiAkc2NvcGUudmFsWyhyb3cqMykrY29sdW1uXSA9PSBudWxsKSB7XG4gICAgICAgICAgICAkaHR0cC5wdXQoJy9nYW1lJywge3Jvdzogcm93LCBjb2x1bW46IGNvbHVtbn0pXG4gICAgICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlU3RhdGUoJHNjb3BlLCBkYXRhKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5lcnJvcihmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5tZXNzYWdlID0gZXJyO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgICRzY29wZS51cGRhdGVQbGF5ZXIgPSBmdW5jdGlvbiB1cGRhdGVQbGF5ZXIocGxheWVyKSB7XG4gICAgICAgIHZhciBwbGF5ZXJUeXBlID0gcGxheWVyID09ICdYJyA/ICRzY29wZS5wbGF5ZXJYIDogJHNjb3BlLnBsYXllck87XG4gICAgICAgIGNvbnNvbGUubG9nKCd1cGRhdGluZyBwbGF5ZXIgXCInICsgcGxheWVyICsgJ1wiIHRvIHR5cGUgXCInICsgcGxheWVyVHlwZSArICdcIicpO1xuICAgICAgICB2YXIgZGF0YSA9IHt9O1xuICAgICAgICBkYXRhW3BsYXllcl0gPSBwbGF5ZXJUeXBlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICRodHRwLnB1dCgnL2dhbWUnLCBkYXRhKVxuICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24ocmV0dXJuRGF0YSkge1xuICAgICAgICAgICAgICAgIHVwZGF0ZVN0YXRlKCRzY29wZSwgcmV0dXJuRGF0YSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmVycm9yKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICRzY29wZS5tZXNzYWdlID0gZXJyO1xuICAgICAgICAgICAgfSk7XG4gICAgfTtcblxuICAgICRzY29wZS5pbml0KCk7XG59KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=