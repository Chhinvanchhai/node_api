const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
    // let token = req.headers['x-access-token'];
    let token;
    if(req.headers.authorization){
        if(req.headers.authorization.startsWith('Bearer') && req.headers.authorization){
            token = req.headers.authorization.split(' ')[1];
        }
    }
	if (!token){
		return res.status(403).send({ 
			auth: false, message: 'No token provided.' 
		});
	}
	jwt.verify(token,process.env.JWT_SESCRET, (err, decoded) => {
		if (err){
			return res.status(500).send({ 
					auth: false, 
					message: 'Fail to Authentication. Error -> ' + err 
				});
		}
		req.userId = decoded.id;
		next();
	});
}
