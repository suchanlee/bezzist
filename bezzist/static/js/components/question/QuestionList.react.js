/**
  * @jsx React.DOM
  * @flow
  */
'use strict';

var React = require('react');
var _ = require('underscore');
var List = require('../base/List.react');
var QuestionRow = require('./QuestionRow.react');

var QuestionList = React.createClass({
  _getRows: function() {
    var questions = _.sortBy(this.props.qs, function(q) {
      return -1 * q.score;
    });
    return _.map(questions, function(q, idx) {
      return <QuestionRow
              key={q.id}
              q={q}
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