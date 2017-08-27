const UserController  = require('../controllers/user');
const AuthController  = require('../controllers/authenticate');
const TokenController = require('../controllers/token');

module.exports = function(express) {
  winston.info('Info | Api Routes Initialized');

  const apiRouter = express.Router();

  apiRouter
    .post('/authenticate', AuthController.authenticate);

  apiRouter.use(TokenController.verify);

  apiRouter
    .get('/users', UserController.getUsers)
    .post('/users', UserController.createUser)
    .get('/users/:user_id', UserController.getUser)
    .put('/users/:user_id', UserController.updateUser)
    .delete('/users/:user_id', UserController.deleteUser);

  return apiRouter;
};