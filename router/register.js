const express = require("express");
const router = express.Router();
const models = require('../models');

router.get('/register', (request, response) =>  {
  response.render('register')
});

router.post('/register', (request, response) => {
  if(request.body.password === request.body.confirm){

  const newUser = models.user.build({
    username: request.body.username,
    email: request.body.email,
    password: request.body.password
  })

  newUser.save().then(function(user){
      response.redirect('/')
    })
    .catch(function(error){
      response.render('register',{
        error: error
      })
    })
  }else{
    let error_message = " "
    response.render('register', {
      error_message: error_message
    })
    }
});


module.exports = router;
