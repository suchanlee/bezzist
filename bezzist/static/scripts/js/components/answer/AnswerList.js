/** @jsx React.DOM */
'use strict';

define(
['react', 'underscore', 'components/base/List', 'components/answer/AnswerRow'],
function (React, _, List, AnswerRow) {
  return React.createClass({
    _getRows: function() {
      var answers = _.sortBy(this.props.answers, function(answer) {
        return -1 * answer.score;
      });
      return _.map(answers, function(answer, idx) {
        return React.createElement(AnswerRow, {
                answer: answer, 
                idx: idx+1, 
                updateAnswer: this.props.updateAnswer});
      }.bind(this));
    },

    render: function() {
      return (
        React.createElement(List, {
          ref: "list", 
          rows: this._getRows()})
      );
    }
  });
});
