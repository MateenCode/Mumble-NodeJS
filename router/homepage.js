const express = require("express")
const router = express.Router();
const model = require('../models')

// Rendering Index Page
router.get('/', function(req, res) {
  res.render('index');
});



//Display stored values in homepage
router.get('/homepage', function(req, res) {

  if (req.session) {

    model.post.findAll({
      order: [
        ['createdAt', 'DESC']
      ]
    }).then((content) => {
      res.render('homepage', {
      content: content,
      user: req.session.username
    })
  })
}else{
 res.redirect('index')
}
});





router.post('/logout', (req, res) => {

    req.session.username = ''
    req.session.password = ''

 return res.redirect('/login')
});





module.exports = router;
