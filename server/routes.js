var controllers = require('./controllers');
var router = require('express').Router();

for (var route in controllers) {
  router.route("/" + route)
    .get(controllers[route].get) // controllers[route].get is a function executed when a get request is made to "/route" (/messages or /users)
          // controllers[messages].get is executed when a get request is made to "/messages"
    .post(controllers[route].post);
}

module.exports = router;

// router.route(somePath)
//   .get(someFunction)
//   .post(someFunction2);

// if you get a request for somePath
//   if it's a get request do someFunction
//   if it's a post request do someFunction2