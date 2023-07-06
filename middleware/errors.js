const ErrorResponse = require('../utils/errorResponse')
const errorHandler =  (err,req,res,next) =>{
    let error = {...err}

    error.message = err.message
    console.log(err.name);
    // mongoose bad object id
    if(err.name === 'CastError'){
        const message =  `Learn node not found!!! ${err.value}.`
        error = new ErrorResponse(message, 404)
    }
    res.status(error.statusCode || 500).json({
        sucess: false,
        message: error.message || 'Sever Error'
    })
}
module.exports = errorHandler;