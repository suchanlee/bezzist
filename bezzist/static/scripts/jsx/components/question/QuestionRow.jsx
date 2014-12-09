/**
  * @jsx React.DOM
  * @flow
  */
'use strict';

define(
['react', 'jquery', 'components/base/Row', 'lib/Utils'],
function (React, $, Row) {
  return React.createClass({

    getStoreKey: function() {
      return 'bz-questions';
    },

    updateQuestionVote: function() {
      $.ajax({
        url: '/api/v1/questions/' + this.props.q.id + '/',
        type: 'PUT',
        data: JSON.stringify({
          'question': this.props.q.question,
          'score': this.props.q.score + 1
        }),
        dataType: 'json'
      }).done(function(q) {
        this.props.updateQuestion(q);
      }.bind(this));
    },

    render: function() {
      return (
        <Row
          storeKey={this.getStoreKey()}
          updateRowVote={this.updateQuestionVote}
          id={this.props.q.id}
          content={this.props.q.question}
          score={this.props.q.score}
          idx={this.props.idx} />
      );
    }
  });
});
