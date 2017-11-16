const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const mustache = require('mustache-express');


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



app.listen(3000);
console.log('Up and Running');
