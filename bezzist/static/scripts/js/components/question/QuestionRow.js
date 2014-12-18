/**
  * @jsx React.DOM
  * @flow
  */
'use strict';

define(
['react', 'jquery', 'store', 'components/base/Row', 'lib/Utils'],
function (React, $, store, Row) {
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

    hasVoted: function() {
      if (store.get(this.getStoreKey()).hasOwnProperty(this.props.q.id)) {
        return true;
      } else {
        return false;
      }
    },

    render: function() {
      return (
        React.createElement(Row, {
          storeKey: this.getStoreKey(), 
          updateRowVote: this.updateQuestionVote, 
          id: this.props.q.id, 
          content: this.props.q.question, 
          score: this.props.q.score, 
          idx: this.props.idx, 
          hasVoted: this.hasVoted})
      );
    }
  });
});
