const http = require('http');
const httpProxy = require('http-proxy');
const { inspect } = require('util');
const { performance } = require('perf_hooks');

function startProxyServer(targetUrl, port) {
    const proxy = createProxyServer();

    const server = createServer(proxy, targetUrl);

    server.listen(port, () => {
        console.log(`http-inspect listening on port ${port}`);
        console.log(`Forwarding requests to ${targetUrl}`);
    });
}

function createProxyServer() {
    const proxy = httpProxy.createProxyServer({});

    proxy.on('proxyRes', (proxyRes, req, res) => {
        let responseBody = [];
        proxyRes.on('data', chunk => responseBody.push(chunk));
        proxyRes.on('end', () => {
            const duration = performance.now() - req._startTime;
            logResponse(proxyRes, responseBody, duration)
        });
    });
    
    return proxy;
}

function createServer(proxy, targetUrl) {
    const server = http.createServer((req, res) => {

        req._startTime = performance.now();

        let requestBody = [];
        req.on('data', chunk => requestBody.push(chunk));
        req.on('end', () => {
            logRequest(req, requestBody)
        });

        proxy.web(req, res, { target: targetUrl });
    });
    return server;
}

function logRequest(req, requestBody) {
    console.log('--- Incoming Request ---');
    console.log(`${req.method} ${req.url}`);
    console.log(`HTTP/${req.httpVersion} ${req.statusCode || ''}`);
    console.log(`Date: ${now()}`);
    logHeaders(req.headers)
    console.log('');
    logBody(requestBody)
    console.log('');
    console.log('');
}

function logResponse(res, responseBody, duration) {
    const contentLength = res.headers['content-length'] || body.length || '0';

    console.log('--- Outgoing Response ---');
    console.log(`${res.statusCode} ${res.statusMessage || ''}`);
    console.log(`Date: ${now()}`);
    logHeaders(res.headers)
    console.log('');
    logBody(responseBody)
    console.log('');
    console.log(`Response code: ${res.statusCode}; Time: ${duration.toFixed(0)}ms; Content length: ${contentLength} bytes`);
    console.log('');
    console.log('');
}

function logHeaders(headers) {
    for (let [key, value] of Object.entries(headers)) {
        console.log(`${key}: ${value}`);
    }
}

function logBody(body) {
    if (body.length === 0) {
        console.log("<Body is empty>");
    } else {
        console.log(inspect(Buffer.concat(body).toString(), { colors: true }));
    }
}

function now() {
    return new Date().toUTCString()
}

module.exports = { startProxyServer };
