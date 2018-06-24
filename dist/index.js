(() => {
    let app = angular.module('forum', [])
    .controller('main', ['$scope', '$http', '$window', '$location', ($scope, $http, $window, $location) => {
        $scope.logged = false;
        $scope.strona = 'strona_glowna';
        $scope.zmienStrone = strona => {
            $location.path(strona);
            $scope.strona = strona;
        };
        $scope.start = () => {
            $location.path('strona_glowna');
            $scope.strona = 'strona_glowna';
        };
        $scope.start();
    }]);
})()