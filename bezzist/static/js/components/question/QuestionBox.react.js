/** @jsx React.DOM */
'use strict';

var React = require('react');
var $ = require('jquery');
var _ = require('underscore');
var store = require('store');
var moment = require('moment');

var QuestionStore = require('../../stores/QuestionStore');
var QuestionTime = require('./QuestionTime.react');
var AnswerList = require('../answer/AnswerList.react');
var AnswerForm = require('../answer/AnswerForm.react');


var QuestionBox = React.createClass({
  // hack
  expandRows: function() {
    this.refs.answerList.refs.list.expandRows();
  },

  getQuestionDate: function() {
    var today = moment();
    var diffDays = Math.floor(moment.duration(today.diff(this.props.question.published)).asHours() / 24);
    var date;
    if (diffDays == 0) {
      date = 'Today';
    } else if (diffDays == 1) {
      date = 'Yesterday'
    } else if (diffDays < 7) {
      date = this.props.question.published.format('dddd');
    } else {
      date = this.props.question.published.format('MMMM D');
    }
    return date;
  },

  getQuestionText: function() {
    return this.props.question ? this.props.question.question : '';
  },

  getForm: function() {
    if (this.props.question && !this.props.question.finished) {
      return (
        <AnswerForm
          question={this.props.question}
          expandRows={this.expandRows} />
      );
    } else {
      return;
    }
  },

  render: function() {
    return (
      <div className='question-box'>
        <h3 className='question-posted-date'>{this.getQuestionDate()}</h3>
        <div className='list-header primary-list-header'>
          <h2>{this.getQuestionText()}</h2>
        </div>
        <QuestionTime q={this.props.question} />
        <AnswerList
          ref='answerList'
          question={this.props.question} />
        {this.getForm()}
      </div>
    );
  },
});

module.exports = QuestionBox;
