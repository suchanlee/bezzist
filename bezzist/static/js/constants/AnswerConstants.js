'use strict';

var keymirror = require('keymirror');

module.exports = {

  ActionTypes: keymirror({
    ANSWER_CREATE: null,
    ANSWER_UPDATE: null,
    ANSWER_UPVOTE: null,
    ANSWER_UNVOTE: null,
    ANSWER_CREATE_FAILED: null,
    ANSWER_UPVOTE_FAILED: null,
    ANSWER_UNVOTE_FAILED: null,
    GET_ANSWERS_FOR_QUESTION: null,
    RECEIVE_ANSWERS_FOR_QUESTION: null
  })

};
