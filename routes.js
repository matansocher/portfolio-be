const express = require('express');
const router = express.Router();
const commonService = require('./services/common.service');
const telegramService = require('./services/telegram.service');

router.post('/is-password-valid', async (req, res, next) => {
    const { password } = req.body;
    try {
        console.log(`is-valid-password endpoint - start`);
        const isPasswordCorrect = password === process.env.websitePassword;
        console.log(`is-valid-password endpoint - done`);
        return res.status(200).send({ success: true, isPasswordCorrect });
    } catch (err) {
        const errorMessage = commonService.getErrorMessage(err);
        console.error(`is-valid-password endpoint - failed process, err: ${errorMessage}`);
        return res.status(500).send({ success: false, isPasswordCorrect: false });
    }
});

router.post('/contact', async (req, res, next) => {
    try {
        console.log(`contact endpoint - start`);
        await telegramService.sendMessage(req.body);
        console.log(`contact endpoint - done`);
        return res.status(200).send({ success: true });
    } catch (err) {
        const errorMessage = commonService.getErrorMessage(err);
        console.error(`contact endpoint - failed process, err: ${errorMessage}`);
        return res.status(500).send({ success: false, isPasswordCorrect: false });
    }
});

module.exports = router;
