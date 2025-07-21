const express = require('express'); // Import Express
const app = express();              // Create an Express app
const port = 3000;                  // Set the port number

// Mock financial risk data
const riskData = [
    { id: 1, client: "Alpha Corp", riskScore: 72, category: "Medium"},
    { id: 2, client: "Beeta LLC", riskScore: 89, category: "High"},
    { id: 3, client: "Gamma Inc", riskScore: 40, category: "Low"}
];

// Set up a GET endpoint /api/risk
app.get('/api/risk', (req, res) => {
    res.json(riskData);
});

// Start server
app.listen(port, () => {
    console.log(`Backend API is running at http://localhost:${port}`);
})