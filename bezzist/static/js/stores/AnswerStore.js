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
var assign = require('object-assign');
var store = require('store');

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
var UserStore = require('./UserStore');

/*
 * Constant imports
 */
var AnswerConstants = require('../constants/AnswerConstants');
var BezzistConstants = require('../constants/BezzistConstants');


/*
 * Field declarations
 */
var TMP_ANSWER_ID = -1; // impossible id for real model object

/*
 * AnswerStore object
 */
var _answers = {}; // key:value = questionId:list of answers
var AnswerStore =  _.extend(BaseStore, {

  addAnswer: function(questionId, answer) {
    if (!(questionId in _answers)) {
      _answers[questionId] = [];
    }
    _answers[questionId].push(answer);
  },

  updateAnswer: function(questionId, answer) {
    _.map(_answers[questionId], function(_answer) {
      if (_answer.id === -1 || _answer.id === answer.id) {
        var answerKeySet = Object.keys(answer);
        if (Object.keys(_answer).length === answerKeySet.length) {
          Utils.removeFromList(_answers[questionId], _answer)
          _answers[questionId].push(answer);
        } else {
          _.map(answerKeySet, function(key) {
            _answer[key] = answer[key];
          });
        }
      }
    });
  },

  removeAnswer: function(questionId, answerId) {
    var answer = this.getAnswerForQuestion(questionId, answerId);
    Utils.removeFromList(_answers[questionId], answer);
  },

  storeAnswers: function(questionId, answers) {
    _answers[questionId] = answers;
  },

  getAnswerForQuestion: function(questionId, answerId) {
    for (var i=0; i<_answers[questionId].length; i++) {
      if (_answers[questionId][i].id === answerId) {
        return _answers[questionId][i];
      }
    }
    throw Error('Answer with id ' + answerId + ' for question with id ' + questionId + ' cannot be found.');
  },

  getAnswersForQuestion: function(questionId) {
    if (questionId in _answers) {
      return Utils.revSortByField(_answers[questionId], 'score');
    } else {
      return [];
    }
  },

});


AppDispatcher.register(function(payload) {

  var ActionTypes = AnswerConstants.ActionTypes;
  var Stores = BezzistConstants.Stores;
  var Status = BezzistConstants.Status;
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.GET_ANSWERS_FOR_QUESTION:
      break;

    case ActionTypes.ANSWER_CREATE:
      AnswerStore.addAnswer(action.questionId, {
        id: TMP_ANSWER_ID,
        answer: action.answer,
        score: 0,
        created: new Date(),
        modified: new Date()
      });
      AnswerStore.emitChange();
      break;

    case ActionTypes.ANSWER_CREATE_FAILED:
      AnswerStore.removeAnswer(action.questionId, TMP_ANSWER_ID);
      AnswerStore.emitChange();
      break;

    case ActionTypes.ANSWER_UPDATE:
      AnswerStore.updateAnswer(action.questionId, action.answer);
      AnswerStore.emitChange();
      break;

    case ActionTypes.ANSWER_UPVOTE:
      //TODO: all the upvote/unvote things need to be
      // refactored out into the model, when it's made for answers and questions.
      // currently, this has too much logic it should not.
      AnswerStore.getAnswerForQuestion(action.questionId, action.answerId).score += 1;
      if (!UserStore.isAuthenticated()) {
        var update = {};
        update[action.answerId] = true;
        store.set(Stores.BEZZIST_ANSWERS, _.extend(store.get(Stores.BEZZIST_ANSWERS), update));
      }
      UserStore.addAnswerLiked(action.answerId);
      AnswerStore.emitChange();
      break;

    case ActionTypes.ANSWER_UPVOTE_FAILED:
      AnswerStore.getAnswerForQuestion(action.questionId, action.answerId).score -= 1;
      if (action.status !== Status.FORBIDDEN) {
        if (!UserStore.isAuthenticated()) {
          var votedAnswers = store.get(Stores.BEZZIST_ANSWERS);
          delete votedAnswers[action.answerId];
          store.set(Stores.BEZZIST_ANSWERS, votedAnswers);
        }
        UserStore.removeAnswerLiked(action.answerId);
      }
      AnswerStore.emitChange();
      break;

    case ActionTypes.ANSWER_UNVOTE:
      AnswerStore.getAnswerForQuestion(action.questionId, action.answerId).score -= 1;
      if (!UserStore.isAuthenticated()) {
        var votedAnswers = store.get(Stores.BEZZIST_ANSWERS);
        delete votedAnswers[action.answerId];
        store.set(Stores.BEZZIST_ANSWERS, votedAnswers);
      }
      UserStore.removeAnswerLiked(action.answerId);
      AnswerStore.emitChange();
      break;

    case ActionTypes.ANSWER_UNVOTE_FAILED:
      AnswerStore.getAnswerForQuestion(action.questionId, action.answerId).score += 1;
      if (action.status !== Status.FORBIDDEN) {
        if (!UserStore.isAuthenticated()) {
          var update = {};
          update[action.answerId] = true;
          store.set(Stores.BEZZIST_ANSWERS, _.extend(store.get(Stores.BEZZIST_ANSWERS), update));
        }
        UserStore.addAnswerLiked(action.answerId);
      }
      AnswerStore.emitChange();
      break;

    case ActionTypes.RECEIVE_ANSWERS_FOR_QUESTION:
      AnswerStore.storeAnswers(action.questionId, action.answers);
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
