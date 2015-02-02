/**
  * @jsx React.DOM
  * @flow
  */
'use strict';

var React = require('react'),

    QuestionViewActionCreators = require('../../actions/QuestionViewActionCreators');

var QuestionRow = React.createClass({
  setAsCurrentQuestion: function() {
    QuestionViewActionCreators.setCurrentQuestion(this.props.question);
  },

  handleClick: function(evt) {
    this.setAsCurrentQuestion();
    evt.preventDefault();
    evt.stopPropagation();
  },

  render: function() {
    var className = 'question-row ' + 'question-row-' + this.props.status;
    return (
      <li
        className={className}
        onClick={this.handleClick}>
        {this.props.question.question}
      </li>
    );
  }
});

module.exports = QuestionRow;
