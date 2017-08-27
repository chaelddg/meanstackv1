(() => {

angular.module('userService', [])

.factory('User', $http => {

  const userFactory = {};

  userFactory.get = id => $http.get(`/api/users/${id}`);

  userFactory.all = () => $http.get('/api/users/');

  userFactory.create = userData => $http.post('/api/users/', userData);

  userFactory.update = (id, userData) => $http.put(`/api/users/${id}`, userData);

  userFactory.delete = id => $http.delete(`/api/users/${id}`);

  return userFactory;

});

})()