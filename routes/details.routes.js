const {Router} = require('express');
const router = Router();
const User = require('../models/User');
const auth = require('../middleware/auth.middleware');
const config = require('config');

// 
// router.get(
//     '/savescore', 
//         async (req, res) => {
//        // console.log('routesavescore',router);
//         try {
//             const { userId, score, rows, level } = req.body;
//             console.log('UserId=',  userId);
//             console.log('score=',  score);
//             if(!userId)  res.status(500).json({ message: 'Не удалось определить UserID' });
//             //console.log('req',  req);
//             console.log('Body',  req.body);
//             const user = await User.findById(userId);
            
//             if(user.maxScore < score){
                
//                 await User.findByIdAndUpdate(userId, {currScore: score, currRows: rows, currLevel: level, maxScore: score});
                
//             } else {
//                 await User.findByIdAndUpdate(userId, {currScore: score, currRows: rows, currLevel: level});
               
//             };
            
//             res.json({ userId: user.id, currScore: user.currScore, currRows: user.currRows, currLevel: user.currLevel });
//             return res.status(201).json({ message: 'Результат игры успешно сохранен'});
            
//         } catch(e){
//             return res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
            
//         }
//     }
// );

// /api/details/:id
router.get('/:id', auth, async (req, res) => {
    try {
        const details = await User.findById(req.params.id);  
        res.json(details);
        console.log(details);
        return res.status(201).json({ message: 'Ваши результаты игры'});

       
    } catch(e){
        return res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
        
    }
});

module.exports = router;