'use strict';

var keymirror = require('keymirror');

module.exports = {

  Time: {
    POLLING_TIMEOUT_MILLIS: 30 * 1000,
    DETAIL_POLLING_TIMEOUT_MILLIS: 10 * 1000
  },

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

  Events: keymirror({
    CHANGE: null,
    USER_CHANGE: null,
    QUESTION_CHANGE: null,
    ANSWER_CHANGE: null,
    OVERLAY_EVENT: null,
    SPINNER_EVENT: null,
  }),

  PayloadSources: keymirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })

};