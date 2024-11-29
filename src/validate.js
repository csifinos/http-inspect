const http = require('http');
const https = require('https');

function validateTargetUrl(targetUrl) {
  try {
    const url = new URL(targetUrl);

    const protocol = url.protocol === 'https:' ? https : http;
    const options = {
      method: 'HEAD',
      host: url.hostname,
      port: url.port || (url.protocol === 'https:' ? 443 : 80),
    };

    const req = protocol.request(options, (res) => {
      if (res.statusCode >= 300) {
        console.error(`Failed to reach target URL: ${targetUrl} (Status: ${res.statusCode})`);
        process.exit(1);
      }
    });

    req.on('error', (err) => {
      console.error(`Error connecting to target URL: ${targetUrl}`);
      console.error(err.message);
      process.exit(1);
    });

    req.end();
  } catch (err) {
    console.error(`Invalid URL: ${targetUrl}`);
    process.exit(1);
  }
}

module.exports = { validateTargetUrl };
