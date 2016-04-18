'use strict';

const express = require('express');
const router = express.Router();
const db = require('monk')('localhost/crmNode');

router.get('/', (req, res, next) => {
    let clients = db.get('clients');

    clients.find({}, {}, (err, clients) => {
        if (err) {
            res.status(404).send({ error: 'There was an issue getting clients' });
        } else {
            res.send({
                clients
            });
        }
    })
});


router.get('/:id', (req, res, next) => {
    let clients = db.get('clients');
    let id = req.params.id;

    clients.findById(id, (err, client) => {
        if (err) {
            res.status(404).send({ error: 'There was an issue finding the client' });
        } else {
            res.send({
                client
            });
        }
    })
});


router.put('/:id', (req, res, next) => {
    let clients = db.get('clients');
    let id = req.params.id;

    clients.findById(id, (err, client) => {
        if (err) {
            res.status(404).send({ error: 'There was an issue finding the client' });
        } else {
            let name  = req.body.name;
            let phone = req.body.phone;
            let email = req.body.email;
            let info  = req.body.info;
            clients.update({_id: id}, {name, phone, email, info});
            res.status(200).send();
        }
    })
});


router.delete('/:id', (req, res, next) => {
    let clients = db.get('clients');
    let id = req.params.id;
    clients.findById(id, (err, client) => {
        if (err) {
            res.status(404).send({ error: 'Can\'t find a client with id: ' + id });
        } else {
            clients.remove( { _id : id });
            res.status(200).send();
        }
    })
});


router.post('/', (req, res, next) => {
    let name  = req.body.name;
    let phone = req.body.phone;
    let email = req.body.email;
    let info  = req.body.info;

    if(!name) {
        res.status(500).send({ error: 'Missed required parameters' });
    } else {
        let clients = db.get('clients');
        clients.insert({
            name,
            phone,
            email,
            info
        }, (err, client) => {
            if(err){
                res.status(500).send({ error: 'There was an issue creating the client' });
            } else {
                res.status(201).send({
                    name,
                    phone,
                    email,
                    info
                });
            }
        });
    }
});


module.exports = router;