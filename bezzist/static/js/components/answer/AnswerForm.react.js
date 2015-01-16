/**
  * @jsx React.DOM
  * @flow
  */
'use strict';

var React = require('react');
var $ = require('jquery');
var Form = require('../base/Form.react');
var AnswerViewActionCreators = require('../../actions/AnswerViewActionCreators');

var AnswerForm = React.createClass({
  getFormError: function() {
    return 'The answer field cannot be empty :(';
  },

  createAnswer: function(answer) {
    return AnswerViewActionCreators.createAnswer(this.props.question.id, answer);
  },

  render: function() {
    return (
      <Form
        formError={this.getFormError()}
        createRow={this.createAnswer}
        expandRows={this.props.expandRows}
        placeholder='add new answer'
        answerForm={true} />
    );
  }
});

module.exports = AnswerForm;