// const db = require('./modules.js');
const client = require('./modules.js');

const controller = {};

controller.cors = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001/api/save');
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
}

controller.saveProject = (req, res, next) => {
    console.log("BODY: " + req.body)
    client.query(`INSERT INTO collections (name, slot1, slot2, slot3, slot4, slot5) VALUES (${req.body.name}, ${req.body.slots[0]}, ${req.body.slots[1]}, ${req.body.slots[2]}, ${req.body.slots[3]}, ${req.body.slots[4]})`)
    next();
}

controller.loadProject = (req, res, next) => {
    client.query(`SELECT * FROM collections WHERE name = ${req.body.name}`)
      .then((response) => response.json())
      .then(data => {
        console.log(data)
        const arr = [data.slot1, data.slot2, data.slot3, data.slot4, data.slot5]
        res.locals.arr = arr
      })
}


module.exports = controller;