'use strict';

var keyMirror = require('keyMirror');

module.exports = {

  Status: {
    FORBIDDEN: 403
  },

  Stores: {
    BEZZIST_ANSWERS: 'bz-answers',
    BEZZIST_QUESTIONS: 'bz-questions',
    BEZZIST_ALERTS: 'bz-alerts'
  },

  Events: keyMirror({
    CHANGE: null,
  }),

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })

};