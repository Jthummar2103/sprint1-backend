var express = require('express');
var router = express.Router();

/* GET home API */
router.get('/', function(req, res) {
  res.json({
    status: "success",
    message: "My API is running 🚀",
    timestamp: new Date()
  });
});

const db = require('../config/database');

router.get('/db-test', async function(req, res) {
  try {
    const [rows] = await db.query("SELECT * FROM test_table");
    res.json({
      status: "Connected",
      data: rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
