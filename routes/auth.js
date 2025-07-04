const express = require('express');
const router = express.Router();
const User= require('../models/User')

const isAdmin = require('../middleware/auth');
router.get('/', (req, res) => {
  if (req.session && req.session.isAdmin) {
    return res.redirect('/dashboard');
  }
  res.redirect('/login');
});
router.get('/login', (req, res) => {
      if (req.session && req.session.isAdmin) {
    return res.redirect('/dashboard');
  }
  res.render('login');
});



router.post('/login', async (req, res) => {
  const { username, password } = req.body;


  if (username === 'admin' && password === 'imposter123') {
    req.session.isAdmin = true;
    res.redirect('/dashboard')
  } else {
    res.send("Invalid login");   
  }
});
router.get('/dashboard',isAdmin,async (req,res)=>{
    const player = await User.find({})
    res.render('dashboard',{player}); 
})
// Optional logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

module.exports = router;
