const express                 = require("express");
const app                     = express();
const volleyball              = require("volleyball");
const path                    = require("path");
const bodyParser              = require("body-parser");

// Middleware
app.use(volleyball); //logging
app.use(express.static(path.join(__dirname, "../public")));//static assets
app.use(bodyParser.json()); //parsing
app.use(bodyParser.urlencoded({ extended: true }));

// API Routes
app.use("/api", require("./routes"));

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../browser/index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
