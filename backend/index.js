const express = require('express')
const app = express()
const PORT = 3001
const apiRouter = require('./api.js')
const client = require('./modules.js');
// const bodyParser = require('body-parser')
// require('dotenv').config()
// const connectionString = process.env.CONNECTION_STRING
// const pgp = require("pg-promise")()
// const db = pgp(connectionString)
// const router = express.Router();

// app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);

// app.post('/save', (req, res) => {
//     console.log(req.body)
//     client.query(`INSERT INTO collections (name, slot1, slot2, slot3, slot4, slot5) VALUES (${req.body.name}, ${req.body.slots[0]}, ${req.body.slots[1]}, ${req.body.slots[2]}, ${req.body.slots[3]}, ${req.body.slots[4]})`)
//     res.status(200)
// })

// app.post('/load', (req, res) => {
//     client.query(`SELECT * FROM collections WHERE name = ${req.body.name}`)
//       .then((response) => response.json())
//       .then(data => {
//         console.log(data)
//         const arr = [data.slot1, data.slot2, data.slot3, data.slot4, data.slot5]
//         res.locals.arr = arr
//       })
//     res.status(200).send(res.locals.arr)
// })


app.use((req, res) => res.status(404).send('This is not page you\'re looking for...'));

// app.use((err, req, res, next) => {
//     const defaultErr = {
//       log: 'Express error handler caught unknown middleware error',
//       status: 500,
//       message: { err: 'An error occurred' },
//     };
//     const errorObj = Object.assign({}, defaultErr, err);
//     console.log(errorObj.log);
//     return res.status(errorObj.status).json(errorObj.message);
//   });


app.listen(PORT, () => {
    console.log("server is running")
});

module.exports = app