const jsonServer = require('json-server');
const server = jsonServer.create();
const bodyParser = require("body-parser");
const router = jsonServer.router('./db.json');
const seed = require('./db.json');
var cors = require('cors');

server.use(cors({
    origin: true,
    credentials: true
}));
server.use(bodyParser.json());
server.use(function(req, res, next) {
    if (req.originalUrl === '/answer') {
        const {
            threads
        } = seed;
        const result = threads.find(({
            threadSet
        }) => {
            const flag = threadSet.some(({
                threadKey
            }) => {
                return threadKey === req.body.threadKey
            })
            return flag;
        })
        if (result?.answer)
            return res.jsonp(result)
        res.status(404);
    }
    next()
});
server.use(router)
var server_port = process.env.PORT || 80;
var server_host = '0.0.0.0';
server.listen(server_port, server_host, function() {
    console.log('Listening on port %d', server_port);
});