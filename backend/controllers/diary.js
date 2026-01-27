const Diary = require('../model/diary');

module.exports.createDiary = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: "All fields Required!" });
        }

        const diary = await Diary.create({
            title,
            content,
            userId: req.user.userId,
        });

        res.status(201).json({message:"Diary Created Successfully!"});
    } catch (error){
        res.status(500).json({message:"Server error",errorMsg:error});
    }
};

module.exports.getAllDiaries = async(req,res) => {
    try{
        const diaries = await Diary.find({userId:req.user.userId}).sort({createdAt:-1});

        res.status(200).json({
            count:diaries.length,
            diaries
        });
    } catch (error){
        res.status(500).json({message:"Server Error"});
    }
};

module.exports.updateDiary = async(req,res) => {
    try{
        const {id} = req.params;
        const {title,content} = req.body;
        
        if(!title || !content){
            return res.status(400).json({message:"Nothing to Update"});
        }

        const diary = await Diary.findOne({
            _id:id,
            userId:req.user.userId
        });

        if(!diary){
            return res.status(404).json({message:"Diary not Found!"});
        }

        if(title) diary.title = title;
        if(content) diary.content = content;

        await diary.save();

        res.status(201).json({
            message:"Diary Updated!",
            diary,
        });
        
    } catch(error){
        res.status(500).json({message:"Server Problem",errorMsg:error});
    }
};

module.exports.deleteDiary = async(req,res) => {
    try{
        const { id } = req.params;

        const diary = await Diary.findOneAndDelete({
            _id:id,
            userId:req.user.userId,
        });

        if(!diary){
            return res.status(404).json({message:"Diary not Found!"});
        }

        res.status(200).json({message:"Diary Deletion Successfully!"});
    } catch (error){
        res.status(500).json({message:"Server Error",errorMsg:error});
    }
};