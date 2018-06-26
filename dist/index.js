(() => {
    let app = angular.module('forum', [])
    .controller('main', ['$scope', '$http', '$window', '$location', ($scope, $http, $window, $location) => {
        /*
            VARS
        */

        $scope.logged = false;
        $scope.strona = 'strona_glowna';
        $scope.showAlert = false;
        $scope.dodajKategorieOkno = false;

        /*
            OBJECTS
        */

        $scope.forms = {
            loginLogin: '',
            loginPassword: '',
            registerLogin: '',
            registerPassword: '',
            registerRepeatPassword: ''
        };

        /*
            FUNCTIONS
        */

        $scope.zmienStrone = strona => {
            $location.path(strona);
            $scope.strona = strona;
        };

        $scope.start = () => {
            if($location.path() == ''){
                $location.path('strona_glowna');
                $scope.strona = 'strona_glowna';
            }else{
                $scope.strona = $location.path().slice(1)
            }
            $http({
                method: 'GET',
                url: 'php/get.php',
            }).then(response => {
                console.log(response.data)
            });
        };

        $scope.login = (login, password) => {
            $http({
                method: 'POST',
                url: 'php/login.php',
                data: $.param({
                    login: login,
                    password: password
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(response => {
                switch(response.data){
                    case '0':
                        $scope.logged = true;
                        $http({
                            method: 'POST',
                            url: 'php/info.php',
                            data: $.param({
                                login: login
                            }),
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).then(response => {
                            $scope.user = response.data;
                            $scope.zmienStrone('strona_glowna');
                        });
                        break;
                    case '1':
                        $scope.alert('Błędne hasło', 'red');
                        break;
                    default: 
                        console.log(response.data);
                        break;
                }
            });
        };

        $scope.register = (login, password, repeatPassword) => {
            if(login == '' || /[<> .,]/.exec(login)){
                return $scope.alert('Niedozwolone znaki w loginie! Nie możesz uzywać <, >!', 'red');
            }else{
                if(password == '' || password.length <= 3){
                    return $scope.alert('Słabe haslo', 'red');
                }
                if(password == repeatPassword){

                    $http({
                        method: 'POST',
                        url: 'php/register.php',
                        data: $.param({
                            login: login,
                            password: password
                        }),
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).then(response => {
                        switch(response.data){
                            case '1':
                                return $scope.alert('Użytkownik o takim loginie już istnieje');
                                break;
                            case '2':
                                return $scope.alert('Wystąpił błąd! Spróbuj ponownie!', 'red');
                                break;
                            case '0':

                                $scope.logged = true;
                                $http({
                                    method: 'POST',
                                    url: 'php/info.php',
                                    data: $.param({
                                        login: login
                                    }),
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    }
                                }).then(response => {
                                    $scope.user = response.data;
                                    $scope.zmienStrone('strona_glowna');
                                });

                                break;
                            default:
                                console.log(response.data);
                                break;
                        }
                    });

                }else{
                    return $scope.alert('Hasła się nie zgadzają!', 'red');
                }
            }
        };

        $scope.alert = (title, color = 'red') => {
            $scope.showAlert = true;
            $scope.titleAlert = title;
            $scope.colorAlert = color;
        };

        $scope.wyloguj = () => {
            $scope.user = false;
            $scope.logged = false;
            $scope.zmienStrone('strona_glowna');
        };

        $scope.dodajKategorie = () => {
            if($scope.logged) {

                $scope.dodajKategorieOkno = true;

            }else {
                return $scope.alert('Niezalogowany uzytkownik nie może dodawać postów!', 'red');
            }
        };

        $scope.dodajKat = nazwa => {
            $scope.dodajKategorieOkno = false;
            if(!$scope.logged){
                return $scope.alert('Musisz być zalogowany!', 'red');
            }else{
                if($scope.user.uprawnienia){

                }
            }
        }

        /*
            REST
        */

        $scope.start();
    }]);
})()