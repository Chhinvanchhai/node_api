const logger = (req,res,next) =>{
    console.log("this is middle ware")
    next();
}
module.exports = logger;