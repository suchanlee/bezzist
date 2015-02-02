'use strict';

var keyMirror = require('keyMirror');

module.exports = {

  Regex: {
    EMAIL: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  },

  Status: {
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
    CONFLICT: 409,
    SERVER_ERROR: 500
  },

  Stores: {
    BEZZIST_ANSWERS: 'bz-answers',
    BEZZIST_QUESTIONS: 'bz-questions',
    BEZZIST_ALERTS: 'bz-alerts'
  },

  Events: keyMirror({
    CHANGE: null,
    OVERLAY_EVENT: null,
    SELECTED_QUESTION_CHANGE: null
  }),

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })

};