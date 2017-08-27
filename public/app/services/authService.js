(() => {

angular.module('authService', [])

.factory('Auth', ($http, $q, AuthToken) => {

  const authFactory = {};

  authFactory.login = (username, password) => {

    return $http.post('/api/authenticate', {
      username,
      password
    })
    .then(data => {
      AuthToken.setToken(data.data.token);

      return data.data;
    });

  };

  authFactory.logout = () => AuthToken.setToken();

  authFactory.isLoggedIn = () => AuthToken.getToken() ? true : false;

  authFactory.getUser = () => {
    if (AuthToken.getToken()) {
      return $http.get('/api/me', { cache: true });
    } else {
      return $q.reject({ message: 'User has no token.' });
    }
  };

  return authFactory;

})

.factory('AuthToken', $window => {

  const authTokenFactory = {};

  authTokenFactory.getToken = () => $window.localStorage.getItem('token');

  authTokenFactory.setToken = token => {
    if (token) {
      $window.localStorage.setItem('token', token);
    } else {
      $window.localStorage.removeItem('token');
    }
  };

  return authTokenFactory;

})

.factory('AuthInterceptor', ($q, $location, AuthToken) => {

  const interceptorFactory = {};

  interceptorFactory.request = config => {
    let token = AuthToken.getToken();

    if (token) {
      config.headers['x-access-token'] = token;
    }

    return config;
  };

  interceptorFactory.responseError = response => {
    if (response.status === 403) {
      AuthToken.setToken();
      $location.path('/login');
    }

    return $q.reject(response);
  };

  return interceptorFactory;

});

})()