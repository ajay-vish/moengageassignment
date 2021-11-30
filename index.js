const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.static('./dist/client'));
app.get('/*', (req, res) => {
    res.sendFile('index.html', { root: './client' });
})

//Done!

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.listen(port, () => {
    console.log("Server started on port " + port + "...");
});