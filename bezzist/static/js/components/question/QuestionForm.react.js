/**
  * @jsx React.DOM
  * @flow
  */
'use strict';

var React = require('react');
var $ = require('jquery');
var Form = require('../base/Form.react');
var QuestionViewActionCreators = require('../../actions/QuestionViewActionCreators');

var QuestionForm = React.createClass({
  getFormError: function() {
    return 'The question field cannot be empty :(';
  },

  createQuestion: function(question) {
    return QuestionViewActionCreators.createQuestion(question);
  },

  render: function() {
    return (
      <Form
        formError={this.getFormError()}
        createRow={this.createQuestion}
        addRow={this.props.addQuestion}
        expandRows={this.props.expandRows}
        placeholder='Add New Question'
        qForm={true} />
    );
  }
});

module.exports = QuestionForm;