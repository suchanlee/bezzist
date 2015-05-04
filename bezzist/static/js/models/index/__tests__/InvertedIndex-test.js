jest.dontMock('../InvertedIndex');
jest.dontMock('../Tokenizer');
jest.dontMock('../../../constants/Stopwords');

var InvertedIndex = require('../InvertedIndex');

describe('InvertedIndex', function() {
  it('initializes an InvertedIndex object', function() {
    var ii = new InvertedIndex();
    expect(ii.ii).toEqual({});
  });
});

describe('InvertedIndex', function() {
  it('gets terms from an empty InvertedIndex object', function() {
    var ii = new InvertedIndex();
    expect(ii.termSet()).toEqual([]);
  });
});

describe('InvertedIndex', function() {
  it('adds a phrase to be parsed into the InvertedIndex and verifies that terms are correct', function() {
    var ii = new InvertedIndex();
    var id = 15;
    var text = 'Singing lullabies quietly';
    ii.parseText(id, text);
    expect(ii.termSet()).toEqual(['singing', 'lullabies', 'quietly']);
  });
});

describe('InvertedIndex', function() {
  it('adds a phrase with stopwords into the InvertedIndex and verifies that terms are correct', function() {
    var ii = new InvertedIndex();
    var id = 15;
    var text = 'He is singing lullabies quietly';
    ii.parseText(id, text);
    expect(ii.termSet()).toEqual(['singing', 'lullabies', 'quietly']);
  });
});

describe('InvertedIndex', function() {
  it('adds a phrase into the InvertedIndex and verifies that term frequencies are correct', function() {
    var ii = new InvertedIndex();
    var id = 15;
    var text = 'He is singing lullabies quietly';
    ii.parseText(id, text);
    expect(ii.getTerm('singing')).toEqual({15: 1});
    expect(ii.getTerm('lullabies')).toEqual({15: 1});
    expect(ii.getTerm('quietly')).toEqual({15: 1});
  });
});

describe('InvertedIndex', function() {
  it('adds the same phrase into the InvertedIndex and verifies that term frequencies are correct', function() {
    var ii = new InvertedIndex();
    var id = 15;
    var text = 'He is singing lullabies quietly';
    var iter = 5;
    for (var i = 0; i < iter; i++) {
      ii.parseText(id, text);
    }
    expect(ii.getTerm('singing')).toEqual({15: iter});
    expect(ii.getTerm('lullabies')).toEqual({15: iter});
    expect(ii.getTerm('quietly')).toEqual({15: iter});
  });
});

describe('InvertedIndex', function() {
  it('adds the multiple phrases into the InvertedIndex and verifies that term frequencies are correct', function() {
    var ii = new InvertedIndex();
    var id1 = 15;
    var id2 = 20;
    var text1 = 'He is singing lullabies quietly';
    var text2 = 'She quietly ate the sandwich';
    var iter = 5;
    ii.parseText(id1, text1);
    ii.parseText(id2, text2);
    expect(ii.getTerm('singing')).toEqual({15: 1});
    expect(ii.getTerm('lullabies')).toEqual({15: 1});
    expect(ii.getTerm('quietly')).toEqual({15: 1, 20: 1});
    expect(ii.getTerm('sandwich')).toEqual({20: 1});
  });
});

