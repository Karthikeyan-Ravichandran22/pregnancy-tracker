const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve client-side files

// Data File Path (Persistent Volume)
// On Railway, we will mount a volume to /app/data
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'tracker_data.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Default Data Structure
const DEFAULT_DATA = {
    grid: Array(7).fill().map(() => ({
        thyroid: false, milk_am: false, breakfast: false, meds_am: false, fruit: false,
        lunch: false, snack: false, dinner: false, meds_pm: false, milk_pm: false, water: false, score: 0
    })),
    waterLog: Array(7).fill(0),
    weightLog: []
};

// API: Get Data
app.get('/api/data', (req, res) => {
    if (fs.existsSync(DATA_FILE)) {
        fs.readFile(DATA_FILE, 'utf8', (err, data) => {
            if (err) {
                console.error("Read Error:", err);
                return res.json(DEFAULT_DATA);
            }
            try {
                res.json(JSON.parse(data));
            } catch (e) {
                res.json(DEFAULT_DATA);
            }
        });
    } else {
        res.json(DEFAULT_DATA);
    }
});

// API: Save Data
app.post('/api/data', (req, res) => {
    const newData = req.body;
    fs.writeFile(DATA_FILE, JSON.stringify(newData, null, 2), (err) => {
        if (err) {
            console.error("Write Error:", err);
            return res.status(500).json({ error: "Failed to save data" });
        }
        res.json({ success: true, message: "Data Saved Securely" });
    });
});

// Serve the main HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🤰 Pregnancy Tracker Server running on port ${PORT}`);
    console.log(`💾 Data storage path: ${DATA_FILE}`);
});
