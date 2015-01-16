'use strict';

var keyMirror = require('keyMirror');

module.exports = {

  ActionTypes: keyMirror({
    ANSWER_CREATE: null,
    ANSWER_UPDATE: null,
    ANSWER_UPVOTE: null,
    ANSWER_CREATE_FAILED: null,
    ANSWER_UPVOTE_FAILED: null,
    GET_ANSWERS_FOR_QUESTION: null,
    RECEIVE_ANSWERS_FOR_QUESTION: null
  })

};
