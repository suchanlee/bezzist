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
        React.createElement("li", {className: "row"}, 
          React.createElement("div", {className: "row-content"}, 
            React.createElement("span", {className: "row-idx"}, this.props.idx), 
            React.createElement("span", {className: "row-text"}, 
              Utils.capitalize(this.props.content)
            )
          ), 
          React.createElement("div", {
            onClick: this.handleVoteClick, 
            className: this._hasVoted() ? 'vote-box voted' : 'vote-box'}, 
            React.createElement("div", {className: "vote-box-inner"}, 
              React.createElement("img", {
                className: "vote-icon", 
                src: '/static/imgs/bezz_thumbsup.png'}), 
              React.createElement("p", {className: "vote-score"}, this.props.score)
            )
          )
        )
      );
    }
  });
});
