'use strict';

var stopwords = require('../../constants/Stopwords').stopwords;

var regex = /\w+/g; // regular expression to tokenize by word and ignoring punctuation.

module.exports = {
  tokenize: function(text) {
    if (text === undefined || text === null || text.trim().length === 0) {
      return [];
    }
    return text.trim().toLowerCase().match(regex).filter(function(word) {
      return stopwords.indexOf(word) === -1;
    });
  }
};