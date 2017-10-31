const express = require("express")
const router = express.Router();
const models = require('../models');

router.get('/login', (req, res) =>{
  res.render('login')
})

router.post('/login', (req, res) =>{
  const username = req.body.username
  const password = req.body.password

 models.user.findOne({
    where:{
      username: username
    }
  }).then( (user) => {
    if(user.password === password){
      req.session.username = user.username
      req.session.password = user.password
      return res.redirect('homepage')
    }
    else{
      let error = "Password is incorrect. "
      response.render('login',{
        error: error
      })
    }
  })
})

router.post('/logout', (req, res) => {

    req.session.username = ''
    req.session.password = ''

 return res.redirect('/index')

})


module.exports = router;
