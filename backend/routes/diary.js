const express = require('express');
const route = express.Router();
const diaryController = require('../controllers/diary');
const {authMiddleware} = require('../middleware/auth');

route.post('/create',authMiddleware,diaryController.createDiary);
route.get('/',authMiddleware,diaryController.getAllDiaries);
route.put('/:id',authMiddleware,diaryController.updateDiary);
route.delete('/:id',authMiddleware,diaryController.deleteDiary);

module.exports = route;