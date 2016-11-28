const dictionary = require('./dictionaries/dictionary');

const firstLevel = require('./levels/firstLevel');
const secondLevel = require('./levels/secondLevel');

class Verifier {
  constructor() {
    this.dictionary = dictionary;
    this.levels = [
      firstLevel,
      secondLevel,
    ];
  }

  verify(text) {
    const input = { text };
    this.levels.forEach(level => level(input, this.dictionary, '***'));
    return input.text;
  }
}

const setupVerifier = (server, options, next) => {
  server.expose('verifier', new Verifier());
  next();
}

exports.register = setupVerifier;

exports.register.attributes = {
  name: 'verifier',
  version: '1.0.0',
};

