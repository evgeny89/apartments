const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.get('/data', (req, res) => {
    res.sendFile(path.join(__dirname, 'data.json'));
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
