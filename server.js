const express        = require('express');
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const winston        = require('winston');
const jsonwebtoken   = require('jsonwebtoken');
const nconf          = require('nconf');
const cors           = require('cors');
const path           = require('path');
const util           = require('util');
const mongoose       = require('mongoose');

const routes         = require('./app/routes/api');

global.nconf         = nconf;
global.util          = util;
global.winston       = winston;
global.jsonwebtoken  = jsonwebtoken;


nconf.argv()
  .env()
  .add('global', { file: __dirname + '/config/env/' + process.env.NODE_ENV + '.json', type: 'file' })
  .add('user', { file: __dirname + '/config/env/development.json', type: 'file' });

winston.remove(winston.transports.Console);

const logger = winston.add(winston.transports.Console, {
  timestamp: true,
  colorize: true
});

logger.stream = {
  write: function(message, encoding) {
    logger.info(message);
  }
};

const app = express();

app.use(cors());
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect(nconf.get('DB'));

app.use(express.static(__dirname + '/public'));

const apiRoutes = routes(express);

app.use('/api', apiRoutes);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.listen(nconf.get('APP_PORT'), function() {
  winston.info('Server listening on port',nconf.get('APP_PORT'));
});

module.exports = app;