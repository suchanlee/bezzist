/** @jsx React.DOM */
'use strict';

define(
['react', 'store', 'lib/Utils'],
function (React, store, Utils) {
  return React.createClass({
    handleVoteClick: function() {
      if (!this._hasVoted()) {
        this._updateAnswerVote();
        this._storeVote();
      }
      return false;
    },

    _updateAnswerVote: function() {
      $.ajax({
        url: '/api/v1/answers/' + this.props.answer.id + '/',
        type: 'PUT',
        data: JSON.stringify({
          'answer': this.props.answer.answer,
          'score': this.props.answer.score + 1
        }),
        dataType: 'json'
      }).done(function(answer) {
        this.props.updateAnswer(answer);
      }.bind(this));
    },

    _hasVoted: function() {
      return store.get('bz-answers').hasOwnProperty(this.props.answer.id);
    },

    _storeVote: function() {
      var update = {};
      update[this.props.answer.id] = true;
      store.set('bz-answers',
                _.extend(store.get('bz-answers'), update));
    },

    render: function() {
      var className = 'answer-row';
      if (this.props.hidden) {
        className += ' hidden';
      }
      return (
        React.createElement("li", {className: className}, 
          React.createElement("div", {className: "answer-row-content"}, 
            React.createElement("span", {className: "answer-idx"}, this.props.idx), 
            React.createElement("span", {className: "answer-text"}, 
              Utils.capitalize(this.props.answer.answer)
            )
          ), 
          React.createElement("div", {
            onClick: this.handleVoteClick, 
            className: this._hasVoted() ? 'answer-vote-box voted' : 'answer-vote-box'}, 
            React.createElement("img", {
              className: "answer-vote-icon", 
              src: '/static/imgs/bezz_thumbsup.png'}), 
            React.createElement("p", {className: "answer-score"}, this.props.answer.score)
          )
        )
      );
    }
  });
});
