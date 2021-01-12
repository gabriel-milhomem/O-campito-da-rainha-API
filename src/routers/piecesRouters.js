const express = require('express');

const router = express.Router();

router.get('/:id/moves', async (req, res) => {
    try {
        
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});


router.post('/:id/moves', async (req, res) => {
    try {

    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

module.exports = router;