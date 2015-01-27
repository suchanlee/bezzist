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

  expandRows: function() {
    return this.refs.questionList.refs.list.expandRows();
  },

  render: function() {
    return (
      <div className='upcoming-container'>
        <div className='list-header secondary-list-header'>
          <h2>Ask Questions to the Cornell Community</h2>
        </div>
        <QuestionList
          ref='questionList' />
        <QuestionForm expandRows={this.expandRows} />
      </div>
    );
  }
});

module.exports = UpcomingBox;