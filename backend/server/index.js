const express = require('express');
const app = express();
const service = require('./service');

app.use('/service', service);

const port = +process.env.Port || 8000;
app.listen(port, () => {
    console.log(`Server is running at ${port}`)
})