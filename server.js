const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const User = require('./models/User');
const app = express();

// MongoDB URI
const mongoURI = 'mongodb+srv://microsoftrishik:qGoAwWk8rokUR2OF@among.zojf7gu.mongodb.net/userStatusDB?retryWrites=true&w=majority';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log(" MongoDB Connected"))
  .catch(err => console.error(" MongoDB Error:", err));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'super-secret-amongus',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 2 // 2 hours (in ms)
  }
}));


app.set('view engine', 'ejs');

// Routes
app.use('/', require('./routes/auth'));
app.use('/kill', require('./routes/kill'));

// 404
app.use((req, res) => res.status(404).render('404'));

app.listen(3000, () => console.log(' Server running on http://localhost:3000'));
