'use strict';
const path = require('path');

module.exports = function(server) {
  const router = server.loopback.Router();

  const states = [
    '/',
  ];
  states.forEach(function(state) {
    router.get(state, function(req, res, next) {
      res.sendFile('index.html', {
        root: path.resolve(__dirname, '../..', 'client'),
      });
    });
  });
  server.use(router);
};
