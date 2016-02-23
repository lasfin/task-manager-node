const express = require('express');
const router = express.Router();

router.get('/:name', (req, res, next) => {
    res.render('partials/' + req.params.name);
});

module.exports = router;
