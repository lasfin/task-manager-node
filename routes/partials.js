const express = require('express');
const router = express.Router();

router.get('/tasks/', (req, res, next) => {
    res.render('partials/tasks');
});

router.get('/clients/', (req, res, next) => {
    res.render('partials/clients');
});

module.exports = router;
