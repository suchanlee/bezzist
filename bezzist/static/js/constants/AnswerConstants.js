'use strict';

var keyMirror = require('keyMirror');

module.exports = {

  ActionTypes: keyMirror({
    CREATE: null,
    UPDATE: null,
    UPVOTE: null,
    CREATE_FAILED: null,
    UPVOTE_FAILED: null,
    GET_ANSWERS_FOR_QUESTION: null,
    RECEIVE_ANSWERS_FOR_QUESTION: null
  })

};
