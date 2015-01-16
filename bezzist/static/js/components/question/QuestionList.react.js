/**
  * @jsx React.DOM
  * @flow
  */
'use strict';

var React = require('react');
var _ = require('underscore');
var List = require('../base/List.react');
var QuestionRow = require('./QuestionRow.react');
var QuestionStore = require('../../stores/QuestionStore');


var QuestionList = React.createClass({
  getInitialState: function() {
    return this._getStateFromStores();
  },

  componentDidMount: function() {
    QuestionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    QuestionStore.removeChangeListener(this._onChange);
  },

  _getStateFromStores: function() {
    return {
      questions: QuestionStore.getQuestions()
    };
  },

  _onChange: function() {
    this.setState(this._getStateFromStores());
  },

  _getRows: function() {
    return _.map(this.state.questions, function(question, idx) {
      return <QuestionRow
              key={question.id}
              question={question}
              idx={idx+1}
              updateQuestion={this.props.updateQuestion} />;
    }.bind(this));
  },

  render: function() {
    return (
      <List
        ref='list'
        qList={true}
        rows={this._getRows()} />
    );
  }
});

module.exports = QuestionList;