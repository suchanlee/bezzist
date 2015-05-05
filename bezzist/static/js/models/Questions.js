'use strict';

var _ = require('underscore');
var Question = require('./Question');

module.exports = {

  createTemp: function(question) {
    return new Question(undefined, question);
  },

  createDefault: function(id, question) {
    return new Question(id, question);
  },

  create: function(question) {
    var args = {
      id: undefined,
      question: undefined,
      score: undefined,
      active: undefined,
      featured: undefined,
      locked: undefined,
      created: undefined,
      modified: undefined,
      published: undefined
    };
    _.extend(args, question);
    return new Question(
      args.id,
      args.question,
      args.score,
      args.active,
      args.featured,
      args.locked,
      args.created,
      args.modified,
      args.published);
  },
};