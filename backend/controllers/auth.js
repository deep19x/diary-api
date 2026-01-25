const bcrypt = require('bcryptjs');
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