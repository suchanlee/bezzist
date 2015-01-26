'use strict';

module.exports = {

  capitalize: function(phrase) {
    return phrase.charAt(0).toUpperCase() + phrase.slice(1);
  },

  setToList: function(set) {
    var list = [];
    var keys = Object.keys(set);
    for (var i=0; i<keys.length; i++) {
      list.push(set[keys]);
    }
    return list;
  },

  listToSet: function(list) {
    var set = {};
    for (var i=0; i<list.length; i++) {
      set[list[i]] = true;
    }
    return set;
  }

}