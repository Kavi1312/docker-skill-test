const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello from Gateway Service!');
});

app.listen(3003, () => {
    console.log('Gateway service running on port 3003');
});
