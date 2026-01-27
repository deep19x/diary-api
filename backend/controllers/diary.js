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