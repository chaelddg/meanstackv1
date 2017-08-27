(() => {

angular.module('app.routes', ['ui.router'])

.config(($stateProvider, $locationProvider) => {
  const homeState = {
    name: 'home',
    url: '/',
    templateUrl: 'app/views/pages/home.html'
  };

  const loginState = {
    name: 'login',
    url: '/login',
    templateUrl: 'app/views/pages/login.html'
  };

  $stateProvider.state(homeState);
  $stateProvider.state(loginState);

  $locationProvider.html5Mode(true);
});

})()