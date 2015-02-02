/**
  * @jsx React.DOM
  * @flow
  */
'use strict';

var React = require('react');
var $ = require('jquery');
var Form = require('../base/Form.react');
var AnswerViewActionCreators = require('../../actions/AnswerViewActionCreators');
var QuestionViewActionCreators = require('../../actions/QuestionViewActionCreators');
var QuestionStore = require('../../stores/QuestionStore');

var AnswerForm = React.createClass({
  getFormError: function() {
    return 'The field cannot be empty :(';
  },

  createAnswer: function(answer) {
    if (QuestionStore.getCurrentQuestion().id === -1) {
      return QuestionViewActionCreators.createQuestion(answer);
    }
    return AnswerViewActionCreators.createAnswer(QuestionStore.getCurrentQuestion().id, answer);
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