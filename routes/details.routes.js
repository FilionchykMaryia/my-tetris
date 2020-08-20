const {Router} = require('express');
const router = Router();
const User = require('../models/User');
const auth = require('../middleware/auth.middleware');
const config = require('config');

// /api/details/
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findOne({email});  
        res.json(user);
        console.log('details =', user);
        return res.json({ token, userId: user.id, currScore: user.currScore, currRows: user.currRows, currLevel: user.currLevel, maxScore: user.maxScore, userName: user.name});

       
    } catch(e){
        return res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
        
    }
});

module.exports = router;