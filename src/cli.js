const minimist = require('minimist');
const { version } = require('./version');

const VERSION = version;

function parseArguments(argv) {
  const args = minimist(argv, {
    string: ['port', 'target'],
    boolean: ['help', 'version'],
    alias: { p: 'port', t: 'target', h: 'help', v: 'version' },
  });

  if (args.help) {
    printHelp();
    process.exit(0);
  }

  if (args.version) {
    printVersion();
    process.exit(0);
  }

  if (!args.target || !args.port) {
    printHelp();
    process.exit();
  }

  return args;
}

function printHelp() {
  console.log(`
  Usage: http-inspect [options] v${VERSION}

  A lightweight CLI tool for logging and inspecting HTTP requests and responses for development purposes.

  Options:
    -p, --port <number>     Port to run the proxy server on
    -t, --target <url>      Target URL to forward requests to
    -v, --version           Show the version
    -h, --help              Display this help message

  Example:
    http-inspect --port 3000 --target http://example.com
  `);
}

function printVersion() {
  console.log(`${VERSION}`);
}

module.exports = { parseArguments };
