const express = require('express');
const router = express.Router();
const User = require('../models/User');
const isAdmin = require('../middleware/auth');

router.get('/:uid', isAdmin, async (req, res) => {
  const player = await User.findOne({ uid: req.params.uid });

  if (!player) return res.status(404).send('❌ Player not found');
  if (!player.alive){player.alive = true
    await player.save();
     return res.send(`☠️ ${player.name} is back.`)
     
}
else{ player.alive = false;
  await player.save();

  res.send(`✅ ${player.name} has been killed!`);}

 
});

module.exports = router;
