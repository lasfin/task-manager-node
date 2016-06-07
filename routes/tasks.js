'use strict';

const express = require('express');
const router = express.Router();
const cr = require('./credentials/db-user');
const db = require('monk')(`mongodb://${cr.username}:${cr.password}@ds033097.mlab.com:33097/heroku_hk3j7g2x`);

router.get('/', (req, res, next) => {
    let tasks = db.get('tasks');

    tasks.find({}, {}, (err, tasks) => {
        if (err) {
            res.status(404).send({ error: 'There was an issue getting the tasks' });
        } else {
            res.send({
                tasks
            });
        }
    })
});


router.get('/:id', (req, res, next) => {
    let tasks = db.get('tasks');
    let id = req.params.id;

    tasks.findById(id, (err, task) => {
        if (err) {
            res.status(404).send({ error: 'There was an issue finding the task' });
        } else {
            res.send({
                task
            });
        }
    })
});


router.put('/:id', (req, res, next) => {
    let tasks = db.get('tasks');
    let id = req.params.id;

    tasks.findById(id, (err, task) => {
        if (err) {
            res.status(404).send({ error: 'There was an issue finding the task' });
        } else {
            let title       = req.body.title;
            let priority    = req.body.priority;
            let body        = req.body.body;
            let tags        = req.body.tags;
            let completed   = req.body.completed;
            let completedAt = req.body.completedAt;
            let createdAt   = req.body.createdAt;
            tasks.update({_id: id}, {title, priority, body, tags, completed, completedAt, createdAt});
            res.status(200).send();
        }
    })
});


router.delete('/:id', (req, res, next) => {
    let tasks = db.get('tasks');
    let id = req.params.id;
    tasks.findById(id, (err, task) => {
        if (err) {
            res.status(404).send({ error: 'Can\'t find a task with id: ' + id });
        } else {
            tasks.remove( { _id : id });
            res.status(200).send();
        }
    })
});


router.post('/', (req, res, next) => {
    let title       = req.body.title;
    let priority    = req.body.priority;
    let subject     = req.body.subject;
    let createdAt   = new Date();
    let tags        = req.body.tags;

    if(!title || !priority || !subject) {
        res.status(500).send({ error: 'Missed required parameters' });
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
                res.status(500).send({ error: 'There was an issue submitting the task' });
            } else {
                res.status(201).send({
                    title,
                    priority,
                    subject,
                    createdAt,
                    tags
                });
            }
        });
    }
});


module.exports = router;
