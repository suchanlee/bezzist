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
  createQuestion: function(question) {
    return QuestionViewActionCreators.createQuestion(question);
  },

  render: function() {
    return (
      <Form
        formError='The question field cannot be empty :('
        createRow={this.createQuestion}
        addRow={this.props.addQuestion}
        expandRows={this.props.expandRows}
        placeholder='Add New Question'
        qForm={true} />
    );
  }
});

module.exports = QuestionForm;