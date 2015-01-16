/** @jsx React.DOM */
'use strict';

var React = require('react');
var _ = require('underscore');
var List = require('../base/List.react');
var AnswerRow = require('../answer/AnswerRow.react');
var AnswerStore = require('../../stores/AnswerStore');

var AnswerList = React.createClass({
  getInitialState: function() {
    return this._getStateFromStores();
  },

  _onChange: function() {
    this.setState(this._getStateFromStores());
  },

  _getStateFromStores: function() {
    var questionId = this.props.question ? this.props.question.id : -1;
    return {
      answers: AnswerStore.getAnswersForQuestion(questionId)
    };
  },

  componentDidMount: function() {
    AnswerStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AnswerStore.removeChangeListener(this._onChange);
  },

  _getRows: function() {
    return _.map(this.state.answers, function(answer, idx) {
      return <AnswerRow
              key={answer.id}
              answer={answer}
              idx={idx+1}
              question={this.props.question} />;
    }.bind(this));
  },

  render: function() {
    return (
      <List
        ref='list'
        rows={this._getRows()} />
    );
  }
});

module.exports = AnswerList;