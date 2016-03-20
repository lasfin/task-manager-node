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


router.post('/', (req, res, next) => {
    // Ger form values
    let title       = req.body.title;
    let priority    = req.body.priority;
    let subject     = req.body.subject;
    let createdAt   = new Date();
    let tags        = req.body.tags;

    let errors  = false;

    // Check Errors
    if(errors) {

    } else {
        let tasks = db.get('tasks');
        tasks.insert({
            title,
            priority,
            body: subject,
            createdAt,
            tags
        }, (err, task) => {
            if(err){
                res.send('There was an issue submitting the task');
            } else {
                res.send('Successfully added');
            }
        });
    }

    
});


module.exports = router;
