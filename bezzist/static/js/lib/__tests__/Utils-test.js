jest.dontMock('../Utils');

var Utils = require('../Utils');


describe('capitalize', function() {
  it('capitalizes the first letter of an all lowercase phrase', function() {
    var phrase = 'this is a simple phrase';
    expect(Utils.capitalize(phrase)).toBe('This is a simple phrase');
  });
});

describe('capitalize', function() {
  it('capitalizes the first letter of an all uppercase phrase', function() {
    var phrase = 'THIS IS A SIMPLE PHRASE';
    expect(Utils.capitalize(phrase)).toBe(phrase);
  });
});

describe('capitalize', function() {
  it('capitalizes the first letter of a phrase with uppercase first letter', function() {
    var phrase = 'This is a simple phrase';
    expect(Utils.capitalize(phrase)).toBe(phrase);
  });
});

describe('sanitizeProfanity', function() {
  it('does not sanitize a clean phrase', function() {
    var phrase = 'This is a very clean phrase!';
    expect(Utils.sanitizeProfanity(phrase)).toBe(phrase);
  });
});

describe('sanitizeProfanity', function() {
  it('sanitize phrase with one profanity', function() {
    var phrase = 'This is a fucked up phrase!';
    expect(Utils.sanitizeProfanity(phrase)).toBe('This is a f***** up phrase!');
  });
});

describe('sanitizeProfanity', function() {
  it('sanitize phrase with multiple profanity', function() {
    var phrase = 'This is a fucked up shitty retarded phrase!';
    expect(Utils.sanitizeProfanity(phrase)).toBe('This is a f***** up s***** r******* phrase!');
  });
});

describe('sanitizeProfanity', function() {
  it('sanitize phrase with capitalized profanity', function() {
    var phrase = 'This is a FUCKeD up phrase!';
    expect(Utils.sanitizeProfanity(phrase)).toBe('This is a F***** up phrase!');
  });
});
