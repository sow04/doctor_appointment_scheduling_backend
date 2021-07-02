const express = require('express');
const router = express.Router();

const loginComponent = require('../../components/v1/auth/doctor_signup');

router.post('/signup', loginComponent);

module.exports = router;