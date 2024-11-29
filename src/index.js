const { startProxyServer } = require('./proxy');
const { parseArguments } = require('./cli');

const args = parseArguments(process.argv.slice(2));
startProxyServer(args.target, args.port);
