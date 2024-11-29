const minimist = require('minimist');

function parseArguments(argv) {
  const args = minimist(argv, {
    string: ['port', 'target'],
    alias: { p: 'port', t: 'target', h: 'help' },
  });

  const shouldPrintHelp = args.help || (!args.target || !args.port);

  if (shouldPrintHelp) {
    printHelp();
    process.exit(0);
  }

  return args;
}

function printHelp() {
  console.log(`
  Usage: http-inspect [options]

  A lightweight CLI tool for logging and inspecting HTTP requests and responses for development purposes.

  Options:
    -p, --port <number>     Port to run the proxy server on
    -t, --target <url>      Target URL to forward requests to
    -h, --help              Display this help message

  Example:
    http-inspect --port 3000 --target http://example.com
  `);
}

module.exports = { parseArguments };
