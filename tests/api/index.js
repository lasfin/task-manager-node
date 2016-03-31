'use strict';

const test        = require('tape');
const request     = require('supertest');
const app         = require('../../app.js');


test('GET /tasks', (assert) => {
    request(app)
        .get('/tasks')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
            assert.error(err, 'No error');
            assert.end();
        });
});


test('POST /tasks', (assert) => {
    let newTask = {
        title: 'New Task',
        priority: 5,
        subject: 'subject',
        tags: ['tag1', 'tag2']
    };

    request(app)
        .post('/tasks')
        .send(newTask)
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
            assert.equal(typeof res.body.createdAt, 'string', 'api should return a creation date');
            assert.error(err, 'No error');
            assert.end();
        });
});