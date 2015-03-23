'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/QuestionConstants').ActionTypes;

var AnswerApiUtils = require('../utils/AnswerApiUtils');

module.exports = {

  receiveQuestion: function(question) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.QUESTION_RECEIVE,
      question: question
    });
    if (question.active) {
      AnswerApiUtils.getAnswersForQuestion(question.id);
    }
  },

  receiveQuestions: function(questions) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_QUESTIONS,
      questions: questions
    });
    for (var i = 0; i < questions.length; i++) {
      if (questions[i].active) {
        AnswerApiUtils.getAnswersForQuestion(questions[i].id);
      }
    }
  },

  upvoteFailedForQuestion: function(questionId, status) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.QUESTION_UPVOTE_FAILED,
      questionId: questionId,
      status: status
    });
  },

  unvoteFailedForQuestion: function(questionId, status) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.QUESTION_UNVOTE_FAILED,
      questionId: questionId,
      status: status
    });
  },

  updateQuestion: function(question) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.QUESTION_UPDATE,
      question: question,
    });
  },

  createQuestionFailed: function() {
    AppDispatcher.handleServerAction({
      type: ActionTypes.QUESTION_CREATE_FAILED
    });
  },

};
