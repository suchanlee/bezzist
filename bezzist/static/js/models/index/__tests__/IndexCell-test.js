jest.dontMock('../IndexCell');

var IndexCell = require('../IndexCell');

describe('IndexCell', function() {
  it('instantiates an IndexCell object', function() {
    var id = 25;
    var defaultFrequency = 1;
    var cell = new IndexCell(id);
    expect(cell.getId()).toBe(id);
    expect(cell.getFrequency()).toBe(defaultFrequency);
  });
});

describe('IndexCell', function() {
  it('increments the frequency', function() {
    var id = 25;
    var defaultFrequency = 1;
    var iter = 10;
    var cell = new IndexCell(id);
    for (var i = 0; i < iter; i++) {
      cell.incrementFrequency();
    }
    expect(cell.getFrequency()).toBe(defaultFrequency + iter);
  });
});

describe('IndexCell', function() {
  it('instantiates multiple IndexCell objects', function() {
    var id1 = 1;
    var id2 = 2;
    var defaultFrequency = 1;
    var cell1 = new IndexCell(id1);
    var cell2 = new IndexCell(id2);
    expect(cell1.getId()).toBe(id1);
    expect(cell2.getId()).toBe(id2);
    expect(cell1.getFrequency()).toBe(defaultFrequency);
    expect(cell2.getFrequency()).toBe(defaultFrequency);
  });
});