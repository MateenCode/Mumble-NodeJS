const express = require("express")
const router = express.Router();
const model = require('../models')



router.get('/post', (req, res) => {
  if (req.session.username) {
    return res.render('post', {
      user: req.session.username
    })
  } else {
    return res.redirect('index')
  }
})


router.post('/createpost', (req, res) => {
  model.post.create({
    postedby: req.session.username,
    body: req.body.text,
    likes: 0,
    likedby: []
  }).then(() => {
    return res.redirect('homepage')
  })
})

router.post('/delete', (req, res) => {
      model.post.destroy({
        where: {
          id: req.body.id,
          postedby: req.session.username
        }
      }).then((newpage) => {
        console.log('This Post here ' + newpage)
        res.redirect('homepage');
      })
    });







module.exports = router;
