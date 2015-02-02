/** @jsx React.DOM */
'use strict';

var React = require('react'),
    _ = require('underscore'),

    AnswerRow = require('../answer/AnswerRow.react'),
    AnswerStore = require('../../stores/AnswerStore'),
    QuestionStore = require('../../stores/QuestionStore');

var AnswerList = React.createClass({
  getInitialState: function() {
    return this._getStateFromStores();
  },

  _onChange: function() {
    this.setState(this._getStateFromStores());
  },

  _getStateFromStores: function() {
    var question, questionId, answers;
    question = QuestionStore.getCurrentQuestion();
    questionId = question ? question.id : -2; //TODO: this is a hack -- fix it later.
    if (questionId === -1) {
      answers = QuestionStore.getInactiveQuestions();
    } else {
      answers = AnswerStore.getAnswersForQuestion(questionId);
    }
    return {
      question: question,
      answers: answers
    };
  },

  componentDidMount: function() {
    AnswerStore.addChangeListener(this._onChange);
    QuestionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AnswerStore.removeChangeListener(this._onChange);
    QuestionStore.addChangeListener(this._onChange);
  },

  selectedQuestionChangeHandler: function(payload) {
    this.setState(payload);
  },

  _getRows: function() {
    return _.map(this.state.answers, function(answer, idx) {
      return <AnswerRow
              key={answer.id}
              answer={answer}
              idx={idx+1}
              question={this.state.question} />;
    }.bind(this));
  },

  render: function() {
    return (
      <ul className='list'>
        {this._getRows()}
      </ul>
    );
  }
});

module.exports = AnswerList;