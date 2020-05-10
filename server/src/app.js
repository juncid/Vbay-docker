const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

var Post = require("../models/posts");

const app = express();
app.use(morgan('combined'))
app.use(bodyParser.json());
app.use(cors());

// DB Setup
const mongoose = require('mongoose');

const DATABASE_URL = process.env.DATABASE_URL || 'http://localhost'
mongoose.connect(`mongodb://${DATABASE_URL}/printBay`, {
  useNewUrlParser: true,
  useCreateIndex:true
});

const db = mongoose.connection;

db.on('error', function (error) {
  // If first connect fails because server-database isn't up yet, try again.
  // This is only needed for first connect, not for runtime reconnects.
  // See: https://github.com/Automattic/mongoose/issues/5169
  if (error.message && error.message.match(/failed to connect to server .* on first connect/)) {
    setTimeout(function () {
      mongoose.connect(`mongodb://${DATABASE_URL}/printBay`, { useNewUrlParser: true }).catch(() => {
        // empty catch avoids unhandled rejections
      });
    }, 20 * 1000);
  } else {
    // Some other error occurred.  Log it.
    console.error(new Date(), String(error));
  }
});

db.once("open", function(callback){
  console.log("Connection Succeeded");
});


// SERVER Setup



app.use("/items", require("../routes/items"));


app.listen(process.env.PORT || 8081)
