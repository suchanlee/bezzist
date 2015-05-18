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
      default_visible_answers: undefined,
      active: undefined,
      featured: undefined,
      locked: undefined,
      hide_score_until_finished: undefined,
      created: undefined,
      modified: undefined,
      published: undefined
    };
    _.extend(args, question);
    return new Question(
      args.id,
      args.question,
      args.score,
      args.default_visible_answers,
      args.active,
      args.featured,
      args.locked,
      args.hide_score_until_finished,
      args.created,
      args.modified,
      args.published);
  },
};