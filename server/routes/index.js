const router = require("express").Router();

router.use("/wages", require("./wages"));

// Error Handling Middleware
router.use( (req, res, next) => {
  const err = new Error("Not found.");
  err.status = 404;
  next(err);
});

module.exports = router;
