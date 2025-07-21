const express = require('express'); // Import Express
const app = express();              // Create an Express app
const port = 3000;                  // Set the port number
const sqlite3 = require('sqlite3').verbose() // Sqlite
// Connect to SQLite DB
const path = require('path');
const dbPath = path.join(__dirname, '..', 'data', 'snowflake_sim.db');
const db = new sqlite3.Database(dbPath);

// Create table
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS risk_data (
            id INTEGER PRIMARY KEY,
            client Text,
            riskScore INTEGER,
            category TEXT
        )
    `);

    db.run(`DELETE FROM risk_data`); // Clearing existing data

    // Mock financial risk data
    const mockData = [
        { id: 1, client: "Alpha Corp", riskScore: 72, category: "Medium"},
        { id: 2, client: "Beeta LLC", riskScore: 89, category: "High"},
        { id: 3, client: "Gamma Inc", riskScore: 40, category: "Low"}
    ];

    const stmt = db.prepare(`INSERT INTO risk_data (id, client, riskScore, category) VALUES (?,?,?,?)`);
    mockData.forEach(d => {
        stmt.run(d.id, d.client, d.riskScore, d.category);
    });
    stmt.finalize();
});

// Set up a GET endpoint /api/risk
app.get('/api/risk', (req, res) => {
    db.all("SELECT * FROM risk_data", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Start server
app.listen(port, () => {
    console.log(`Backend API is running at http://localhost:${port}`);
})