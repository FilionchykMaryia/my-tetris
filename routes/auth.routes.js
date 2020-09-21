const {Router} = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const router = Router();

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Incorrected email').isEmail(),
        check('password', 'The minimum password length is 6 symbols')
            .isLength({ min: 6 }),
        check('name', 'The minimum name length is 3 symbols')
            .isLength({ min: 3 }),
    ],
    async (req, res) => {
    try {
        console.log('Body',  req.body);
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect data during registration',
            });
        };

        const { name, email, password } = req.body;

        const candidateEmail = await User.findOne({ email });
        const candidateName = await User.findOne({ name });

        if(candidateEmail){
            return res.status(400).json({ message: 'A user with this e-mail already exists' });
        } else if(candidateName) {
            return res.status(400).json({ message: 'A user with this name already exists' });
        };

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ name, email, password: hashedPassword });

        await user.save();

        res.status(201).json({ message: 'Registration was successful '});
        
    } catch (e){
        res.status(500).json({ message: 'Something went wrong, try again' });
    }
});
// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Enter the correct email address').normalizeEmail().isEmail(),
        check('password', 'Enter the password').exists()
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect data when you log in',
            })
        };

        const {email, password} = req.body;
        const user = await User.findOne({ email });

        if(!user){
            return res.status(400).json({ message: 'The user is not found'})
        };

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({ message: 'Invalid password, please try again' })
        };

        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '1h' },
        );

        res.json({ token, userId: user.id, currScore: user.currScore, currRows: user.currRows, currLevel: user.currLevel, maxScore: user.maxScore, userName: user.name});
        
        
    } catch (e){
        res.status(500).json({ message: 'Something went wrong, try again' });
    }
});

module.exports = router;