const express = require("express")
const router = express.Router();
const model = require('../models')



router.post('/likes', (req, res) => {

  model.post.build({
    id: req.body.id
  }, {
    isNewRecord: false
  }).increment('likes').then(user => {
    user.likedby.push(req.session.username)
    user.update({
      likedby: user.likedby
    }, {
      where: {
        id: req.body.id
      }
    })
  }).then(function() {
    res.redirect('homepage')
  })
});







module.exports = router;
