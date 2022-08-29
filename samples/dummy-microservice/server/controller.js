const microserviceFunctionStore = require('../microservice.js');

const controller = {};

//assuming the legacy microservice to use the data in the request body and invoke 
controller.invokeFunction = (req, res, next) => {
  try {
    console.log('req.body is')
    console.log(req.body);
    res.locals.result = microserviceFunctionStore.mergeSort(req.body);
      return next();
  }
  catch(err){
      return next({ message: `err: ${err}` })
  }
}


module.exports = controller;  