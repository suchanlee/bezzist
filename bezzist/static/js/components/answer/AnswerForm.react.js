/**
  * @jsx React.DOM
  * @flow
  */
'use strict';

/*
 * External library imports
 */
var _ = require('underscore');
var React = require('react');
var $ = require('jquery');

/*
 * Component imports
 */
var Form = require('../base/Form.react');

/*
 * ActionCreator imports
 */
var AnswerViewActionCreators = require('../../actions/AnswerViewActionCreators');

/*
 * Store imports
 */
var InvertedIndexStore = require('../../stores/InvertedIndexStore');
var AnswerStore = require('../../stores/AnswerStore');

/*
 * Constant imports
 */
var AnswerConstants = require('../../constants/AnswerConstants');


var AnswerForm = React.createClass({
  getFormError: function() {
    return 'The answer field cannot be empty :(';
  },

  createAnswer: function(answer) {
    var simAnswerIds = this._getSimilarAnswers(answer);
    if (simAnswerIds.length > 0) {
      var confirmText = 'There exist similar answers:\n';
      for (var i = 0; i < simAnswerIds.length; i++) {
        confirmText += AnswerStore.getAnswerIndex(this.props.question.getId(), simAnswerIds[i]) + '. ';
        confirmText += AnswerStore.getAnswerForQuestion(this.props.question.getId(), simAnswerIds[i]).getAnswer() + '\n';
      }
      confirmText += 'Still post answer?';
      if (!window.confirm(confirmText)) {
        return;
      }
    }
    return AnswerViewActionCreators.createAnswer(this.props.question.getId(), answer);
  },

  // Get number of words matched by existing answers
  // and return a list of ids of matching answers,
  // where matching is defined as having a higher fraction
  // of matching words than some pre-defined threshold.
  _getSimilarAnswers: function(answer) {
    var ii = InvertedIndexStore.getIndex(this.props.question.getId());
    var words = answer.toLowerCase().split(' ');
    var matchingAnswers = {};
    var similarAnswerIds = [];

    for (var i = 0; i < words.length; i++) {
      var matches = ii.getTerm(words[i]);
      var answerIds = _.keys(matches);
      for (var j = 0; j < answerIds.length; j++) {
        if (answerIds[j] in matchingAnswers) {
          matchingAnswers[answerIds[j]] += 1;
        } else {
          matchingAnswers[answerIds[j]] = 1;
        }
      }
    }

    var numWords = words.length;
    for (var answerId in matchingAnswers) {
      if ((matchingAnswers[answerId] / numWords) > AnswerConstants.SIMILARITY_THRESHOLD) {
        similarAnswerIds.push(parseInt(answerId));
      }
    }

    return similarAnswerIds;
  },

  render: function() {
    return (
      <Form
        formError={this.getFormError()}
        createRow={this.createAnswer}
        expandRows={this.props.expandRows}
        placeholder='Add New Answer'
        answerForm={true} />
    );
  }
});

module.exports = AnswerForm;