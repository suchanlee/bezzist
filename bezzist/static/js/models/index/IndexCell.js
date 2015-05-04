'use strict';

var IndexCell = function(id) {
  var id = id;
  var frequency = 1;

  this.getId = function() {
    return id;
  };

  this.getFrequency = function() {
    return frequency;
  };

  this.incrementFrequency = function() {
    frequency += 1;
  };
};

module.exports = IndexCell;