const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

require('./config/passport')(passport);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const users = require('./routes/users');
app.use('/api/users', users);

const posts = require('./routes/posts');
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
