const levenshtein = require('../helpers/levenshtein');

const secondLevel = (input, dictionary, censure) => {
  const words = input.text.split(' ');
  const censored = words.map(word => {
    dictionary.forEach(banned => {
      const prepared = word.toLowerCase().replace(/([^*!?])\1+/g, '$1');
      if(levenshtein(prepared, banned.toLowerCase()) <= process.env.LEVENSHTEIN_FACTOR) {
        word = censure;
      }
    });
    return word;
  });
  input.text = censored.join(' ');
}

module.exports = secondLevel;