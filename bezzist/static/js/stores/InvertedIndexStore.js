/**
 * InvertedIndexStore
 */

'use strict';

/*
 * General library imports
 */
var _ = require('underscore');

/*
 * Store imports
 */
var BaseStore = require('./BaseStore');

/*
 * Model imports
 */
var InvertedIndex = require('../models/index/InvertedIndex');

// private variable for storing iis
var _invertedIndexes = {};

var InvertedIndexStore = _.extend(_.clone(BaseStore), {

  addIndex: function(questionId) {
    _invertedIndexes[questionId] = new InvertedIndex();
  },

  getIndex: function(questionId) {
    if (questionId in _invertedIndexes) {
      return _invertedIndexes[questionId];
    } else {
      throw new ReferenceError('The term ' + term + ' has not been indexed.');
    }
  }

});

module.exports = InvertedIndexStore;