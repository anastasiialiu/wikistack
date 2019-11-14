const express = require('express');
const morgan = require('morgan');
const { db } = require('./models');
const bodyParser = require("body-parser");
const layout = require('./views/layout');

const app = express();

db.authenticate().
then(() => {
  console.log('connected to the database');
})

app.use(morgan('dev'));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:false}));



app.get('/', (req, res) => {
    res.send(layout(""));
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
})