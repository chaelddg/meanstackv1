(() => {

angular.module('mainCtrl', [])

.controller('mainController', function($location, $transitions, Auth) {

  const vm = this;

  vm.loggedIn = Auth.isLoggedIn();

  $transitions.onStart({}, function(trans) {
    vm.loggedIn = Auth.isLoggedIn();

    Auth.getUser()
      .then(data => {
        vm.user = data.data;
      })
      .catch(err => {
        // do nothing for now
      });
  });

  vm.doLogin = () => {
    vm.processing = true;

    vm.error = '';

    Auth.login(vm.loginData.username, vm.loginData.password)  
      .then(data => {
        vm.processing = false;

        if (data.success) {
          $location.path('/users');
        } else {
          vm.error = data.message;
        }
      });
  };

  vm.doLogout = () => {
    Auth.logout();
    vm.user = '';

    $location.path('/login');
  };

})

})()