/** @jsx React.DOM */
'use strict';

var React = require('react'),

    QuestionStore = require('../../stores/QuestionStore'),
    QuestionList = require('./QuestionList.react');

var Questions = React.createClass({

  render: function() {
    return (
      <div className='questions'>
        <QuestionList />
      </div>
    );
  },
});

module.exports = Questions;
