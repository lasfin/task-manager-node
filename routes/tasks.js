'use strict';

const express = require('express');
const router = express.Router();
const db = require('monk')('localhost/crmNode');

router.get('/', (req, res, next) => {
    let tasks = db.get('tasks');

    tasks.find({}, {}, (err, tasks) => {
        res.send({
            tasks
        });
    })
});


module.exports = router;
