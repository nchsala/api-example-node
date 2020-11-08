const express = require("express")
const config = require("./config")
const routes = require("./routes")
const mongoose = require('mongoose')

mongoose.connect( ...require( './credentials/db' ).url )

const app = express();
config(app, { useCors: true })
routes(app)

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});