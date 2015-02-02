/**
  * @jsx React.DOM
  * @flow
  */
'use strict';

var React = require('react');
var AnswerList = require('../answer/AnswerList.react');
var AnswerForm = require('../answer/AnswerForm.react');


var Answers = React.createClass({
  render: function() {
    return (
      <div className='answers'>
        <AnswerList />
        <AnswerForm />
      </div>
    );
  }
});

module.exports = Answers;