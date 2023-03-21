require('dotenv').config();
const http = require('http');
const app = require('./app');
const PORT = process.env.PORT || 4000;
const server = http.createServer(app);

server.listen(PORT, async () => {
    console.log(`Server is Running on port ${PORT}`)
});
