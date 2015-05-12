'use strict';

var _ = require('underscore');
var Answer = require('./Answer');

module.exports = {

  createTemp: function(answer) {
    return new Answer(undefined, answer);
  },

  createDefault: function(id, answer) {
    return new Answer(id, answer);
  },

  create: function(answerObj) {
    var args = {
      id: undefined,
      answer: undefined,
      score: undefined,
      created: undefined,
      modified: undefined
    };
    _.extend(args, answerObj);
    return new Answer(
      args.id,
      args.answer,
      args.score,
      args.created,
      args.modified);
  },
};