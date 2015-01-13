/** @jsx React.DOM */
'use strict';

define(
['react', 'store', 'components/base/Row'],
function (React, store, Row) {
  return React.createClass({
    getStoreKey: function() {
      return 'bz-answers';
    },

    updateAnswerVote: function() {
      $.ajax({
        url: '/api/v1/answers/' + this.props.answer.id + '/incrementScore',
        type: 'POST',
        data: {
          'csrfmiddlewaretoken': $('#csrf input').val()
        },
      }).done(function(answer) {
        this.props.updateAnswer(answer);
      }.bind(this));
    },

    hasVoted: function() {
      if (store.get(this.getStoreKey()).hasOwnProperty(this.props.answer.id) ||
        this.props.isFinished) {
        return true;
      } else {
        return false;
      }
    },

    render: function() {
      return (
        React.createElement(Row, {
          storeKey: this.getStoreKey(), 
          updateRowVote: this.updateAnswerVote, 
          id: this.props.answer.id, 
          content: this.props.answer.answer, 
          score: this.props.answer.score, 
          idx: this.props.idx, 
          hasVoted: this.hasVoted})
      );
    }
  });
});
