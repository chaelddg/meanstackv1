(() => {

angular.module('userCtrl', ['userService'])

.controller('userController', function(User) {

  const vm = this;

  vm.processing = true;

  User.all()
    .then(data => {
      vm.processing = false;
      vm.users = data.data;
    });

  vm.deleteUser = id => {
    vm.processing = true;

    User.delete(id)
      .then(data => {
        User.all()
          .then(data => {
            vm.processing = false;
            vm.users = data.data;
          });
      });
  };

})

.controller('userCreateController', function(User) {

  const vm = this;

  vm.type = 'create';

  vm.saveUser = () => {
    vm.processing = true;
    vm.message = '';

    User.create(vm.userData)
      .then(data => {
        vm.processing = false;
        vm.userData = {};
        vm.message = data.message;
      });
  };

})

.controller('userEditController', function ($routeParams, User) {

  const vm = this;

  vm.type = 'edit';

  User.get($routeParams.user_id)
    .then(data => {
      vm.userData = data.data;
    });

  vm.saveUser = () => {
    vm.processing = true;
    vm.message = '';

    User.update($routeParams.user_id, vm.userData)
      .then(data => {
        vm.processing = false;

        vm.userData = {};

        vm.message = data.data.message;
      });
  };

});

})()