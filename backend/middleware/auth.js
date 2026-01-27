const jwt = require('jsonwebtoken');

module.exports.authMiddleware = async(req,res,next) => {
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(400).json({message:"Not Authenticated!"});
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch(error){
        res.status(500).json({message:"Invalid or Expired Token"});
    }
};