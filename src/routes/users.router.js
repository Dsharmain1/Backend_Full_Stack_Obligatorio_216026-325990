const express = require('express');

const { updateProfile, changePlan } = require('../controller/users.constroller');   
const router = express.Router();

router.put("/users/profile", updateProfile);

router.put("/users/plan", changePlan);  

module.exports = router;