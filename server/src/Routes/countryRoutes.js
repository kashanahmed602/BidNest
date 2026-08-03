const express = require('express');
const router = express.Router();

const { getCountries } = require('../Controller/countryController');

router.get('/countries', getCountries);

module.exports = router;