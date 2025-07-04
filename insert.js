const mongoose = require('mongoose');
const User = require('./models/User');
const { v4: uuidv4 } = require('uuid');

mongoose.connect('mongodb+srv://microsoftrishik:qGoAwWk8rokUR2OF@among.zojf7gu.mongodb.net/userStatusDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

(async () => {
  await User.deleteMany();

  const players = [];

  for (let i = 1; i <= 12; i++) {
    players.push(new User({
      name: `Player ${i}`,
      alive: true,
      uid: uuidv4()
    }));
  }

  await User.insertMany(players);
  console.log("done");
  mongoose.disconnect();
})();
