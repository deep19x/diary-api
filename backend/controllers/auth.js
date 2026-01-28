const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const User = require('../model/user');

module.exports.registerUser = async (req,res) => {
    const user = req.body;

    if(!user.name || !user.email || !user.password){
        return res.status(400).json({message:"Incomplete Information"});
    }
    
    const existingUser = await User.findOne({email:user.email});
    if(existingUser){
        return res.status(400).json({message:"User Already Exists"});
    }

    const hashedPass = await bcrypt.hash(user.password,10);
    
    try{
        await User.create({name:user.name,email:user.email,password:hashedPass});
        res.status(200).json({message:"User Registered!"});
    } catch (error){
        res.status(500).json({message:"User Registration Failed!"});
    }
}

module.exports.loginUser = async(req,res) => {
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email:email});

        if(!user){
            return res.status(500).json({message:"User Not Found! Please Register First"});
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(500).json({message:"Invalid Credentials"});
        }

        const token = jwt.sign(
            {userId:user._id,userName:user.name,userEmail:user.email},
            process.env.JWT_SECRET,
            {expiresIn:'1h'}
        );

        res.cookie('token',token,{
            httpOnly:true,
            sameSite:'strict',
            maxAge: 60*60*1000,
        });

        res.status(200).json({
            message:"User Login Successful!",
        });

    } catch (error){
        res.status(500).json({message:"Server Problem",error:error.message});
    }
}

module.exports.logoutUser = async(req,res) => {
    res.clearCookie('token',{
        httpOnly:true,
        sameSite:'strict',
    });

    res.status(200).json({message:"Logged Out Successfully!"});
}