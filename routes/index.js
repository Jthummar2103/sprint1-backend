var express = require('express');
var router = express.Router();
const db = require('../config/database');

/* GET home API */
router.get('/', function(req, res) {
  res.json({
    status: "success",
    message: "My API is running 🚀",
    timestamp: new Date()
  });
});

// DB test
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

// CREATE TABLE ROUTE
router.get('/create-table', async function(req, res) {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS test_table (
        id INT AUTO_INCREMENT PRIMARY KEY,
        message VARCHAR(255)
      )
    `);
    res.json({ status: "Table created" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// INSERT DATA ROUTE
router.get('/insert-test', async function(req, res) {
  try {
    await db.query("INSERT INTO test_table (message) VALUES ('Hello from Aiven Cloud')");
    res.json({ status: "Inserted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
