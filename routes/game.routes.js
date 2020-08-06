const {Router} = require('express');
const router = Router();
const User = require('../models/User');
const auth = require('../middleware/auth.middleware');
const config = require('config');

// /api/game/savescore
router.post(
    '/savescore', 
        async (req, res) => {
       // console.log('routesavescore',router);
        try {
            
            const { userId, score, level } = req.body;
            console.log('UserId=',  userId);
            console.log('score=',  score);
            if(!userId)  res.status(500).json({ message: 'Не удалось определить UserID' });
            //console.log('req',  req);
            console.log('Body',  req.body);
            const user = await User.findById(userId);
            
                if(user.maxScore < score){
                    await User.findByIdAndUpdate(userId, {currScore: score, maxScore: score, currLevel: level},);
                   
                } else {
                    await User.findByIdAndUpdate(userId, {currScore: score, currLevel: level});
                };
            

            // if(score && level) {
            //     if (score){
            //         if(user.maxScore < score){
            //             await User.findByIdAndUpdate(userId, {currScore: score, maxScore: score});
            //         } else {
            //             await User.findByIdAndUpdate(userId, {currScore: score});
            //         }; 
            //      };
            //     if (level) {
            //          await User.findByIdAndUpdate(userId, {currLevel: level});
            //     }; 
            // } else return;
            

            // const token = jwt.sign(
            //     { userId: user.id },
            //     config.get('jwtSecret'),
            //     { expiresIn: '1h' },
            // );
    
            res.json({ userId: user.id, currScore: user.currScore, currLevel: user.currLevel });
            res.status(201).json({ message: 'Результат игры успешно сохранен'});
            
        } catch(e){
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
        }
    }
);

router.get('/:id', auth, async (req, res) => {
    try {
        const points = await User.findById(req.params.id);  
        res.json(points);
        res.status(201).json({ message: ''});
        
    } catch(e){
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
});

module.exports = router;