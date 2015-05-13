'use strict';

var Tokenizer = require('./Tokenizer');

var InvertedIndex = function() {
  this.ii = {};
};

/**
 * Gets the indexed terms.
 *
 * @return {List<string>} List of terms
 */
InvertedIndex.prototype.termSet = function() {
  return Object.keys(this.ii);
};

/**
 * Parses a given text
 *
 * @param  {int} id       Id of the corpus, by which it the corpus can be referred
 * @param  {string} text  The text to index
 * @return {boolean}      Returns true if successfully parsed text
 */
InvertedIndex.prototype.parseText = function(id, text) {
  var terms = Tokenizer.tokenize(text);
  for (var i = 0; i < terms.length; i++) {
    var term = terms[i];
    if (term in this.ii) {
      if (id in this.ii[term]) {
        this.ii[term][id] += 1;
      } else {
        this.ii[term][id] = 1;
      }
    } else {
      var termEntry = {};
      termEntry[id] = 1;
      this.ii[term] = termEntry;
    }
  }
};

InvertedIndex.prototype.getTerm = function(term) {
  if (term in this.ii) {
    return this.ii[term];
  }
  return {};
};

module.exports = InvertedIndex;
