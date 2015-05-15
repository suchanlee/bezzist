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

  componentDidMount: function() {
    AnswerStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AnswerStore.removeChangeListener(this._onChange);
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    if (nextState.answers.length !== this.state.answers.length) {
      return true;
    } else {
      for (var i = 0; i < this.state.answers.length; i++) {
        if (nextState.answers[i] !== this.state.answers[i]) {
          return true;
        }
      }
    }
    return false;
  },

  _onChange: function() {
    this.setState(this._getStateFromStores());
  },

  _getStateFromStores: function() {
    return {
      answers: AnswerStore.getAnswersForQuestion(this.props.question.getId())
    };
  },

  _getRows: function() {
    return _.map(this.state.answers, function(answer, idx) {
      return <AnswerRow
              key={answer.getId()}
              answer={answer}
              idx={idx+1}
              question={this.props.question} />;
    }.bind(this));
  },

  render: function() {
    return (
      <List
        ref='list'
        rows={this._getRows()}
        numVisibleRows={this.props.question.getNumVisible()} />
    );
  }
});

module.exports = AnswerList;