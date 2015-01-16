'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/QuestionConstants').ActionTypes;

module.exports = {
  receiveAllQuestions: function(questions) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.ACTION_RECEIVE_ALL_QUESTIONS,
      questions: questions
    });
  }
};
