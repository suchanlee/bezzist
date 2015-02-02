/**
  * @jsx React.DOM
  * @flow
  */
'use strict';

var React = require('react'),
    _ = require('underscore'),
    QuestionRow = require('./QuestionRow.react'),
    QuestionStore = require('../../stores/QuestionStore');


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

  getQuestions: function() {
    var ask, featured, active, finished;
    ask = [<QuestionRow
            key='-1'
            question= { {question: "What should tomorrow's question be?", id: -1} }
            status='ask' />];
    featured = _.map(this.state.featured, function(question) {
      return <QuestionRow
              key={question.id}
              question={question}
              status='featured' />;
    });
    active = _.map(this.state.active, function(question) {
      return <QuestionRow
              key={question.id}
              question={question}
              status='active' />;
    });
    finished = _.map(this.state.finished, function(question) {
      return <QuestionRow
              key={question.id}
              question={question}
              status='finished' />;
    });
    return ask.concat(featured).concat(active).concat(finished);
  },

  _onChange: function() {
    this.setState(this._getStateFromStores());
  },

  _getStateFromStores: function() {
    return {
      featured: QuestionStore.getFeaturedQuestions(),
      active: QuestionStore.getActiveQuestions(),
      finished: QuestionStore.getFinishedQuestions()
    };
  },

  render: function() {
    return (
      <ul className='question-list'>
        <li className='question-row'>Questions</li>
        {this.getQuestions()}
      </ul>
    );
  }
});

module.exports = QuestionList;