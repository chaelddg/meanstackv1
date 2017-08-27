(() => {

angular.module('mainApp', ['app.routes', 'userCtrl', 'mainCtrl', 'authService', 'userService'])

.config(function($httpProvider) {

  $httpProvider.interceptors.push('AuthInterceptor');

});

})()