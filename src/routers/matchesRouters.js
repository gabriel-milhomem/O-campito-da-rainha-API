const express = require('express');

const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});


router.post('/', async (req, res) => {
    try {

    } catch (err) {
        console.error(err);
        res.sendStatus(500)
    }
});