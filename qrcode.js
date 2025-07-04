const mongoose = require('mongoose');
const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');
const User = require('./models/User');
require('dotenv').config();

const OUTPUT_FOLDER = path.join(__dirname, './qrcodes');
const BASE_URL = 'https://among-us-main.onrender.com/kill'; // or your live domain

(async () => {
  await mongoose.connect('mongodb+srv://microsoftrishik:qGoAwWk8rokUR2OF@among.zojf7gu.mongodb.net/userStatusDB?retryWrites=true&w=majority');

  if (!fs.existsSync(OUTPUT_FOLDER)) {
    fs.mkdirSync(OUTPUT_FOLDER);
  }

  const players = await User.find();

  if (players.length === 0) {
    console.log("❌ No players found. Run seedPlayers.js first.");
    return mongoose.disconnect();
  }

  for (const player of players) {
    const url = `${BASE_URL}/${player.uid}`;
    const filename = path.join(OUTPUT_FOLDER, `${player.name}.png`);

    await QRCode.toFile(filename, url);
    console.log(`✅ QR for ${player.name} saved at ${filename}`);
  }

  mongoose.disconnect();
})();
