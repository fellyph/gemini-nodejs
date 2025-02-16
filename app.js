import express from 'express';
// import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Simple HTML form route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
