'use strict';

const express = require('express');
const router = express.Router();
const cr = require('./credentials/db-user');
const db = require('monk')(`mongodb://${cr.username}:${cr.password}@ds033097.mlab.com:33097/heroku_hk3j7g2x`);

router.get('/tasks', (req, res, next) => {
    let tasks = db.get('tasks');

    tasks.find({}, {}, (err, tasks) => {
        if (err) {
            res.status(404).send({ error: 'There was an issue getting the task statistic' });
        } else {
            res.send(prepareStats(tasks));
        }
    })
});


function prepareStats(tasksArr) {
    let stats = {
        total: 0,
        completed: 0,
        unfinished: 0
    };
    tasksArr.forEach((task) => {
        stats.total += 1;
        if (task.completed) {
            stats.completed += 1;
        } else {
            stats.unfinished += 1;
        }
    });
    return stats;
}


module.exports = router;
