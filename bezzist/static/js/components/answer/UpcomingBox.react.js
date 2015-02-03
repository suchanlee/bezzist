/**
  * @jsx React.DOM
  * @flow
  */
'use strict';

var React = require('react');
var $ = require('jquery');
var _ = require('underscore');
var store = require('store');
var QuestionList = require('../question/QuestionList.react');
var QuestionForm = require('../question/QuestionForm.react');


var UpcomingBox = React.createClass({
  getInitialState: function() {
    return { hidden: true };
  },

  expandRows: function() {
    return this.refs.questionList.refs.list.expandRows();
  },

  handleClick: function(evt) {
    this.toggleList();
    evt.stopPropagation();
    evt.preventDefault();
  },

  toggleList: function() {
    this.setState({ hidden: !this.state.hidden })
  },

  render: function() {
    var listClass = this.state.hidden ? 'upcoming-list hidden' : 'upcoming-list';
    return (
      <div className='upcoming-container'>
        <div
          onClick={this.handleClick}
          className='list-header secondary-list-header'>
          <h2>Vote for Tomorrow's Question</h2>
        </div>
        <div className={listClass}>
          <p className='upcoming-description'>The question with the most votes is chosen
          to be asked tomorrow.<br />Cast your vote and add your question!</p>
          <QuestionList
            ref='questionList' />
          <QuestionForm expandRows={this.expandRows} />
        </div>
      </div>
    );
  }
});

module.exports = UpcomingBox;