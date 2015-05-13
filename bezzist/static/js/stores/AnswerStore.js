/**
 * AnswerStore
 *
 * Keeps a list of Answer objects in a dictionary
 * whose key is the questionId and value is the list
 * of answers for the question corresponding to the
 * key questionId.
 *
 * Subscribed to actions from [AnswerViewActionCreator,
 * AnswerServerActionCreator].
 */

'use strict';

/*
 * General library imports
 */
var _ = require('underscore');

/*
 * Local library imports
 */
var Utils = require('../lib/Utils');

/*
 * Dispatcher import
 */
var AppDispatcher = require('../dispatcher/AppDispatcher');

/*
 * Store imports
 */
var BaseStore = require('./BaseStore');
var InvertedIndexStore = require('./InvertedIndexStore');

/*
 * Model factory imports
 */
var Answers = require('../models/Answers');

/*
 * Constant imports
 */
var AnswerConstants = require('../constants/AnswerConstants');
var BezzistConstants = require('../constants/BezzistConstants');


/*
 * Field declarations
 */
var TMP_ANSWER_ID = AnswerConstants.TMP_ANSWER_ID;

/*
 * AnswerStore object
 */
var _answers = {}; // key:value = questionId:list of answers
var _answerIds = {}; // set of currently loaded ids

var AnswerStore =  _.extend(_.clone(BaseStore), {

  addAnswer: function(questionId, answer) {
    if (!(questionId in _answers)) {
      _answers[questionId] = [];
    }
    if (!(answer.getId() in _answerIds)) {
      _answers[questionId].push(answer);
      _answerIds[answer.getId()] = true;
      var ii = InvertedIndexStore.getIndex(questionId);
      ii.parseText(answer.getId(), answer.getAnswer());
    } else {
      this.updateAnswer(questionId, answer);
    }
  },

  updateAnswer: function(questionId, answer) {
    _.map(_answers[questionId], function(_answer) {
      if (_answer.getId() === TMP_ANSWER_ID || _answer.getId() === answer.getId()) {
        this.removeAnswer(questionId, _answer.getId());
        this.addAnswer(questionId, answer);
      }
    }.bind(this));
  },

  removeAnswer: function(questionId, answerId) {
    var answer = this.getAnswerForQuestion(questionId, answerId);
    Utils.removeFromList(_answers[questionId], answer);
    delete _answerIds[answerId];
  },

  addAnswers: function(questionId, answers) {
    for (var i = 0; i < answers.length; i++) {
      this.addAnswer(questionId, Answers.create(answers[i]));
    }
  },

  getAnswerForQuestion: function(questionId, answerId) {
    for (var i = 0; i < _answers[questionId].length; i++) {
      if (_answers[questionId][i].getId() === answerId) {
        return _answers[questionId][i];
      }
    }
    throw Error('Answer with id ' + answerId + ' for question with id ' + questionId + ' cannot be found.');
  },

  getAnswersForQuestion: function(questionId) {
    if (questionId in _answers) {
      _answers[questionId] = Utils.revSortByField(_answers[questionId], 'getScore');
      return _.map(_answers[questionId], _.clone);
    } else {
      return [];
    }
  },

  getAnswerIndex: function(questionId, answerId) {
    var answers = Utils.revSortByField(_answers[questionId], 'getScore');
    for (var i = 0; i < answers.length; i++) {
      if (answers[i].getId() === answerId) {
        return i + 1; // 1-indexed
      }
    }
    return -1;
  },

});

AnswerStore.setChangeEvent(BezzistConstants.Events.ANSWER_CHANGE);

AppDispatcher.register(function(payload) {

  var ActionTypes = AnswerConstants.ActionTypes;
  var Stores = BezzistConstants.Stores;
  var Status = BezzistConstants.Status;
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.GET_ANSWERS_FOR_QUESTION:
      break;

    case ActionTypes.ANSWER_CREATE:
      AnswerStore.addAnswer(action.questionId, Answers.createTemp(action.answer));
      AnswerStore.emitChange();
      break;

    case ActionTypes.ANSWER_CREATE_FAILED:
      AnswerStore.removeAnswer(action.questionId, TMP_ANSWER_ID);
      AnswerStore.emitChange();
      break;

    case ActionTypes.ANSWER_UPDATE:
      AnswerStore.updateAnswer(action.questionId, Answers.create(action.answer));
      AnswerStore.emitChange();
      break;

    case ActionTypes.ANSWER_UPVOTE:
      AnswerStore.getAnswerForQuestion(action.questionId, action.answerId).incrementScore();
      AnswerStore.emitChange();
      break;

    case ActionTypes.ANSWER_UPVOTE_FAILED:
      AnswerStore.getAnswerForQuestion(action.questionId, action.answerId).decrementScore(action.status);
      AnswerStore.emitChange();
      break;

    case ActionTypes.ANSWER_UNVOTE:
      AnswerStore.getAnswerForQuestion(action.questionId, action.answerId).decrementScore();
      AnswerStore.emitChange();
      break;

    case ActionTypes.ANSWER_UNVOTE_FAILED:
      AnswerStore.getAnswerForQuestion(action.questionId, action.answerId).incrementScore(action.status);
      AnswerStore.emitChange();
      break;

    case ActionTypes.RECEIVE_ANSWERS_FOR_QUESTION:
      AnswerStore.addAnswers(action.questionId, action.answers);
      AnswerStore.emitChange();
      break;

    default:
      // no op
  }
});

/*
 * Module export declaration
 */
module.exports = AnswerStore;
