const firstLevel = (input, dictionary, censure) => {
  const patterns = dictionary.map(banned => new RegExp(banned.toLowerCase().split('').map(char => `(${char})+`).join('')));
  const words = input.text.split(' ');
  const censored = words.map(word => {
    patterns.forEach(pattern => {
      if (pattern.test(word.toLowerCase())) {
        word = censure;
      }
    });
    return word;
  });
  input.text = censored.join(' ');
}

module.exports = firstLevel;