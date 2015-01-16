'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/QuestionConstants').ActionTypes;

module.exports = {
  receiveActiveQuestions: function(questions) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.ACTION_RECEIVE_ACTIVE_QUESTIONS,
      questions: questions
    });
  }
};
