const $TLS = require("tls");
const $NativeHttps = require("http2");
const $FS = require("fs");
const SERVER_ADDR = '127.0.0.1';
const SERVER_HOST = 'b.local.org';
const SERVER_PORT = 8089;
const SERVER_BACKLOG = 512;
const THE_CA = $FS.readFileSync('./certs/ca.pem');
const server = $NativeHttps.createSecureServer({
    ca: THE_CA,
    cert: $FS.readFileSync('./certs/cert.pem'),
    key: $FS.readFileSync('./certs/key.pem'),
}, function (req, resp) {
    resp.setHeader('content-type', 'text/plain');
    resp.setHeader('content-length', 12);
    resp.end('hello world!');
});
server.listen(SERVER_PORT, SERVER_ADDR, SERVER_BACKLOG, () => {
    const socket = $TLS.connect({
        host: SERVER_ADDR,
        port: SERVER_PORT,
        servername: SERVER_HOST,
        ca: THE_CA,
        ALPNProtocols: ['h2']
    }, function () {
        console.log('TLS ok');
        $NativeHttps.connect(`https://${SERVER_ADDR}:${SERVER_PORT}`, {
            createConnection() { return socket; }
        }, function () {
            console.log('H2 ok');
        }).on('error', console.error);
    });
});
