'use strict';

var keyMirror = require('keyMirror');

module.exports = {

  ActionTypes: keyMirror({
    QUESTION_CREATE: null,
    QUESTION_UPDATE: null,
    QUESTION_UPVOTE: null,
    QUESTION_UNVOTE: null,
    QUESTION_CREATE_FAILED: null,
    QUESTION_UPVOTE_FAILED: null,
    QUESTION_UNVOTE_FAILED: null,
    RECEIVE_ALL_QUESTIONS: null
  })

};