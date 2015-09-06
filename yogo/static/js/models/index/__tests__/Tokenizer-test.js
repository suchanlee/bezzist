jest.dontMock('../Tokenizer');
jest.dontMock('../../../constants/Stopwords');

var Tokenizer = require('../Tokenizer');

describe('Tokenizer', function() {
  it('tokenizes a simple English phrase with no stopwords', function() {
    var phrase = 'ballpark slippers bear';
    var terms = Tokenizer.tokenize(phrase);
    var phraseSplit = phrase.split(' ');
    for (var i = 0; i < phraseSplit.length; i++) {
      expect(terms.indexOf(phraseSplit[i])).not.toBe(-1);
    }
  });
});

describe('Tokenizer', function() {
  it('tokenizes a simple English phrase with stopwords', function() {
    var phrase = 'a be is the ballpark slippers bear';
    var terms = Tokenizer.tokenize(phrase);
    var phraseSplit = phrase.split(' ');
    var numStopwords = 4;
    for (var i = numStopwords; i < phraseSplit.length; i++) {
      expect(terms.indexOf(phraseSplit[i])).not.toBe(-1);
    }
    expect(terms.length).toBe(phraseSplit.length - numStopwords);
  });
});

describe('Tokenizer', function() {
  it('tries to tokenize an empty string', function() {
    var phrase = '';
    var terms = Tokenizer.tokenize(phrase);
    expect(terms).toEqual([]);
  });
});

describe('Tokenizer', function() {
  it('tries to tokenize an undefined object', function() {
    var phrase = '';
    var terms = Tokenizer.tokenize(phrase);
    expect(terms).toEqual([]);
  });
});

describe('Tokenizer', function() {
  it('tries to tokenize a null object', function() {
    var phrase = '';
    var terms = Tokenizer.tokenize(phrase);
    expect(terms).toEqual([]);
  });
});
