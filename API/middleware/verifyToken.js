const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next, verifyUser=false) => {
    try {
        return new Promise((resolve, reject) => {
            let token;
            if(req.headers){
                token = req.headers.authorization;
            }else{
                return res.status(400).json({success: false, message: "You are not authenticated"});
            }
            if(!token){
                return res.status(400).json({success: false, message: "You are not authenticated"});
            }
            console.log("token", token);
            const my_token = token.split(" ");
            console.log("my_token", my_token);
            jwt.verify(my_token[1], process.env.SECRET_KEY, (err, user) => {
                if(err)
                    reject("Token is not valid!");
                req.user = user;
                if(!verifyUser){
                    next();
                    resolve(req.user);
                }else{
                    resolve(req.user.id);
                }
            });
        });
    } catch (error) {
        return res.status(400).json({success: false, message: "You are not authenticated", error});
    }
}