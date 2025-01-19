const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello from Order Service!');
});

app.listen(3002, () => {
    console.log('Order service running on port 3002');
});
