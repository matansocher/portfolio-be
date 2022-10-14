const express = require('express');
const router = express.Router();
const commonService = require('./services/common.service');

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

module.exports = router;
