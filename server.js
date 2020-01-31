const app = require('./app');
const database = require('./db');
const host = "localhost";

const port = process.env.PORT || 8000;

app.listen(port, host, () => {
    database.initiateDatabase();
    console.log('Server started on port: ', port);
});