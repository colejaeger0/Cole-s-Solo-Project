const express = require('express');
const controller = require('./controller.js');
const router = express.Router();

//router.get('/', (req, res) => res.status(200).send('ass'))

router.post('/save', controller.saveProject, controller.cors, (req, res) => {
    res.status(200)
})

router.post('/load', controller.loadProject, (req, res) => res.status(200).send(res.locals.arr))


module.exports = router;