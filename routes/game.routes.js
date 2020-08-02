const {Router} = require('express');
const router = Router();
const User = require('../models/User');

// /api/game/savescore
router.post(
    '/savescore', 
    [],
    async (req, res) => {
       // console.log('routesavescore',router);
        try {
            
            const {score, userId, level} = req.body;
            //console.log('req',  req);
            console.log('Body',  req.body);
            const user = await User.findById(userId);
            console.log('userID=',  userId);
            if(user.maxScore < score){
                await User.findByIdAndUpdate(userId, {currScore: score, maxScore: score, currLevel: level});
                // user.maxScore = score;
            } else {
                await User.findByIdAndUpdate(userId, {currScore: score, currLevel:level});
            };
            res.status(201).json({ message: 'Результат игры успешно сохранен'});
            
        } catch(e){
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
        }
    }
);

//router.get('/:id', async (req, res) => {

//});

module.exports = router;