const router                = require("express").Router();
const axios                 = require("axios");

const API = "https://data.seattle.gov/api/views/cf52-s8er/rows.json?api_key=SCC1c0Cove7ypmBeuf3dTX2WZOk6qEfCAki6MoNi";

// GET /api/wages
router.get("/", (req, res, next) => {
  axios.get(`${API}`)
  .then( wages => {
    res.status(200).send(wages.data);
  })
  .catch(error => res.status(500).send(error));
});

module.exports = router;
