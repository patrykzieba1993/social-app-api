const bunyan = require('bunyan');
const HapiBunyanHandler = require('hapi-bunyan');
const Package = require('./../../package');

function writeRaw(log) {
  const msg = log.msg;
  if (msg) {
    process.stdout.write(`${msg}\n`);
  }
}

const streams = [
  {
    level: 'info',
    stream: process.stdout,
  },
  {
    level: 'error',
    stream: process.stderr,
  },
  {
    level: 'debug',
    type: 'raw',
    stream: {
      write: writeRaw,
    },
  },
];

const logger = bunyan.createLogger({
  name: Package.name,
  streams: process.env.LOGGING_DISABLED ? [] : streams,
});

module.exports = {
  handler: HapiBunyanHandler,
  logger,
};
