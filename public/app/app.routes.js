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
    templateUrl: 'app/views/pages/login.html',
    controller: 'mainController as login'
  };

  const usersState = {
    name: 'users',
    url: '/users',
    templateUrl: 'app/views/pages/users/all.html',
    controller: 'userController as user'
  };

  const usersCreateState = {
    name: 'users-create',
    url: '/users/create',
    templateUrl: 'app/views/pages/users/single.html',
    controller: 'userCreateController as user'
  };

  const usersEditState = {
    name: 'users-edit',
    url: '/users/:user_id',
    templateUrl: 'app/views/pages/users/single.html',
    controller: 'userEditController as user'
  };

  $stateProvider.state(homeState);
  $stateProvider.state(loginState);
  $stateProvider.state(usersState);
  $stateProvider.state(usersCreateState);
  $stateProvider.state(usersEditState);

  $locationProvider.html5Mode(true);
});

})()