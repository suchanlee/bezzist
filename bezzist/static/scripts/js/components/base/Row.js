/** @jsx React.DOM */
'use strict';

define(
['react', 'store', 'lib/Utils'],
function (React, store, Utils) {
  return React.createClass({
    handleVoteClick: function() {
      if (!this._hasVoted()) {
        this.props.updateRowVote();
        this._storeVote();
      }
      return false;
    },

    _hasVoted: function() {
      return store.get(this.props.storeKey).hasOwnProperty(this.props.id);
    },

    _storeVote: function() {
      var update = {};
      update[this.props.id] = true;
      store.set(this.props.storeKey, _.extend(store.get(this.props.storeKey), update));
    },

    render: function() {
      return (
        React.createElement("li", {className: "answer-row"}, 
          React.createElement("div", {className: "answer-row-content"}, 
            React.createElement("span", {className: "answer-idx"}, this.props.idx), 
            React.createElement("span", {className: "answer-text"}, 
              Utils.capitalize(this.props.content)
            )
          ), 
          React.createElement("div", {
            onClick: this.handleVoteClick, 
            className: this._hasVoted() ? 'answer-vote-box voted' : 'answer-vote-box'}, 
            React.createElement("img", {
              className: "answer-vote-icon", 
              src: '/static/imgs/bezz_thumbsup.png'}), 
            React.createElement("p", {className: "answer-score"}, this.props.score)
          )
        )
      );
    }
  });
});
