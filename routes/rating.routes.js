const {Router} = require('express');
const router = Router();
const User = require("../models/User");
const auth = require('../middleware/auth.middleware');
const config = require('config');

// /api/rating/
router.get('/', auth, async (req, res) => {
    try {
        console.log('users =');
        const users = await User.find().sort({maxScore: -1}).limit(5);  
        
        // const users = await User.find({name: 'Mary'}); 
        res.json(users);
        console.log('users =', users);
        return res.status(201).json({ message: ''});

       
    } catch(e){
        return res.status(500).json({ message: 'Something went wrong, try again' });
        
    }
});

module.exports = router;