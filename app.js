const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const mustache = require('mustache-express');
var pg = require('pg')


app.use(express.static('public'));
app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({extended: false}));


app.use(session({
  secret: 'KeyBoardCat',
  resave: false,
  saveUninitialized: true
}))


const homepage = require("./router/homepage");
const post = require("./router/post");
const likes = require("./router/likes");
const login = require("./router/login");
const register = require("./router/register");

app.use(homepage);
app.use(post);
app.use(likes);
app.use(login);
app.use(register);

// Allows app to connect to Heroku database
pg.defaults.ssl = true
pg.connect(process.env.DATABASE_URL, function (err, client) {
  if (err) throw err
  console.log('Connected to postgres! Getting schemas...')

  client
    .query('SELECT table_schema,table_name FROM information_schema.tables;')
    .on('row', function (row) {
      console.log(JSON.stringify(row))
    })
})


const port = process.env.PORT || 3000
app.listen(port, function () {
  console.log('Server is ON! Go to host:port:' + port)
})
