/** @jsx React.DOM */
'use strict';

var React = require('react');
var $ = require('jquery');
var _ = require('underscore');
var store = require('store');
var moment = require('moment');
var router = require('director').Router();

var QuestionStore = require('../../stores/QuestionStore');
var AnswerList = require('../answer/AnswerList.react');
var AnswerForm = require('../answer/AnswerForm.react');


var QuestionBox = React.createClass({
  // hack
  expandRows: function() {
    this.refs.answerList.refs.list.expandRows();
  },

  getDateText: function() {
    // TODO: remove this one-time hack for Shark Tank event
    if (this.props.question.isFeatured()) {
      return 'FEATURED QUESTION';
    }
    var today = moment();
    var diffDays = Math.floor(moment.duration(today.diff(this.props.question.getPublished())).asHours() / 24);
    var date;
    if (diffDays == 0) {
      date = "TODAY'S QUESTION";
    } else if (diffDays == 1) {
      date = "YESTERDAY'S QUESTION";
    } else {
      date = this.props.question.getPublished().format("MMMM D YYYY").toUpperCase();
    }
    return date;
  },

  getForm: function() {
    if (this.props.question && !this.props.question.isLocked()) {
      return (
        <AnswerForm
          question={this.props.question}
          expandRows={this.expandRows} />
      );
    } else {
      return;
    }
  },

  titleClickHandler: function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setRoute();
  },

  setRoute: function() {
    var detailViewUri = '/questions/' + this.props.question.getId();
    router.setRoute(detailViewUri);
  },

  render: function() {
    // TODO: remove this one-time hack for Shark Tank event
    var boxClass = this.props.question.isFeatured() ? 'question-box question-box-featured' : 'question-box';
    return (
      <div className={boxClass}>
        <div className='list-header primary-list-header'>
          <p className='question-posted-date'>{this.getDateText()}</p>
          <h2 onClick={this.titleClickHandler}>{this.props.question.getQuestion()}</h2>
          <div className='question-vote-now-container'>
            <p className='question-vote-now'>VOTE NOW</p>
            <img className='vote-pointer' src={'/static/imgs/icons/fingerdown.png'} />
          </div>
        </div>
        <AnswerList
          ref='answerList'
          question={this.props.question} />
        {this.getForm()}
      </div>
    );
  },
});

module.exports = QuestionBox;
