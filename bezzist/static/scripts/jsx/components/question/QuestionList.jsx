/**
  * @jsx React.DOM
  * @flow
  */
'use strict';

define(
['react', 'underscore', 'components/base/List', 'components/question/QuestionRow'],
function (React, _, List, QuestionRow) {
  return React.createClass({
    _getRows: function() {
      var questions = _.sortBy(this.props.qs, function(q) {
        return -1 * q.score;
      });
      return _.map(questions, function(q, idx) {
        return <QuestionRow
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
});
