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
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов')
            .isLength({ min: 6 }),
        check('name', 'Имя должно быть не менее 3 символов')
            .isLength({ min: 3 }),
    ],
    async (req, res) => {
    try {
        console.log('Body',  req.body);
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при регистрации',
            });
        };

        const { name, email, password } = req.body;

        const candidateEmail = await User.findOne({ email });
        const candidateName = await User.findOne({ name });

        if(candidateEmail){
            return res.status(400).json({ message: 'Пользователь с таким e-mail уже существует' });
        } else if(candidateName) {
            return res.status(400).json({ message: 'Пользователь с таким именем уже существует' });
        };

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ name, email, password: hashedPassword });

        await user.save();

        res.status(201).json({ message: 'Регистрация прошла успешно '});
        
    } catch (e){
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
});
// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при входе в систему',
            })
        };

        const {email, password} = req.body;
        const user = await User.findOne({ email });

        if(!user){
            return res.status(400).json({ message: 'Пользователь не найден'})
        };

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
        };

        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '1h' },
        );
        
        res.json({ token, userId: user.id, score: user.currScore, level: user.currLevel });
        
        
    } catch (e){
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
});

module.exports = router;