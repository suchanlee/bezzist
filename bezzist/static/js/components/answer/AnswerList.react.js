/** @jsx React.DOM */
'use strict';

var React = require('react');
var _ = require('underscore');
var List = require('../base/List.react');
var AnswerRow = require('../answer/AnswerRow.react');

var AnswerList = React.createClass({
  _getRows: function() {
    var answers = _.sortBy(this.props.answers, function(answer) {
      return -1 * answer.score;
    });
    return _.map(answers, function(answer, idx) {
      return <AnswerRow
              key={answer.id}
              answer={answer}
              idx={idx+1}
              qId={this.props.q.id}
              isFinished={this.props.q.finished}
              updateAnswer={this.props.updateAnswer} />;
    }.bind(this));
  },

  render: function() {
    return (
      <List
        ref='list'
        rows={this._getRows()} />
    );
  }
});

module.exports = AnswerList;