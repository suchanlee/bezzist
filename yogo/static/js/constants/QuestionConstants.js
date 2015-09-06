'use strict';

var keymirror = require('keymirror');

module.exports = {

  TMP_QUESTION_ID: -1,

  ActionTypes: keymirror({
    QUESTION_CREATE: null,
    QUESTION_RECEIVE: null,
    QUESTION_UPDATE: null,
    QUESTION_UPVOTE: null,
    QUESTION_UNVOTE: null,
    QUESTION_CREATE_FAILED: null,
    QUESTION_UPVOTE_FAILED: null,
    QUESTION_UNVOTE_FAILED: null,
    RECEIVE_QUESTIONS: null,
    RECEIVE_PAGED_QUESTIONS: null
  })

};