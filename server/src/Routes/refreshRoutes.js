const express = require('express')
const router = express.Router();

const { refreshToken } = require('../Controller/refreshController');

router.post("/refresh-token", refreshAccessToken);

module.exports = router;