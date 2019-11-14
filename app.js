const express = require('express');
const morgan = require('morgan');
const models = require('./models');
const bodyParser = require("body-parser");
const layout = require('./views/layout');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');

const app = express();

// db.authenticate().
// then(() => {
//   console.log('connected to the database');
// })

app.use(morgan('dev'));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:false}));

app.use('/wiki', wikiRouter);
app.use('/user', userRouter);



app.get('/', (req, res) => {
    res.send(layout(""));
})

const init = async () => {
  await models.db.sync({force: true});

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
}

init();
