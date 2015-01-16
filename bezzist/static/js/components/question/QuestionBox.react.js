/** @jsx React.DOM */
'use strict';

var React = require('react');
var $ = require('jquery');
var _ = require('underscore');
var store = require('store');

var QuestionStore = require('../../stores/QuestionStore');
var QuestionTime = require('./QuestionTime.react');
var AnswerList = require('../answer/AnswerList.react');
var AnswerForm = require('../answer/AnswerForm.react');


var getStateFromStores = function() {
  return {
    question: QuestionStore.getFeaturedQuestion()
  }
}

var QuestionBox = React.createClass({
  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    QuestionStore.addChangeListener(this._onChange);
    // $.getJSON('/api/v1/questions/', {
    //   'active': 'true'
    // }).done(function(qList) {
    //   if (this.isMounted()) {
    //     this.setState({
    //       q: qList['questions'][0]
    //     });
    //   }
    //   this._updateStore();
    //   $.getJSON('/api/v1/questions/' + this.state.q.id + '/answers')
    //    .done(function(answers) {
    //     this.setState({
    //       answers: answers['answers']
    //     });
    //     this.props.notifyLoaded();
    //   }.bind(this));
    // }.bind(this));
  },

  componentWillUnmount: function() {
    QuestionStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  },

  // hack
  expandRows: function() {
    this.refs.answerList.refs.list.expandRows();
  },

  getQuestionText: function() {
    return this.state.question ? this.state.question.question : '';
  },

  getForm: function() {
    if (this.state.question && !this.state.question.finished) {
      return (
        <AnswerForm
          question={this.state.question}
          expandRows={this.expandRows} />
      );
    } else {
      return;
    }
  },

  render: function() {
    return (
      <div className='question-box'>
        <div className='list-header primary-list-header'>
          <h2>{this.getQuestionText()}</h2>
        </div>
        <QuestionTime q={this.state.question} />
        <AnswerList
          ref='answerList'
          question={this.state.question} />
        {this.getForm()}
      </div>
    );
  },
});

module.exports = QuestionBox;
