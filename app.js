const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const app = express();

app.use(express.json({ extended: true }));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/game', require('./routes/game.routes'));
const PORT = config.get('port') || 5000;

async function start() {
    try {
        mongoose.set('useFindAndModify', false);
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        app.listen(PORT, () => {
            console.log(`Server has been started on port ${PORT}...`);
        });
    } catch(e){
        console.log(e);
        process.exit(1);
    }
}

start();