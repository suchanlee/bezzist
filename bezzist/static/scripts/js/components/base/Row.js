/** @jsx React.DOM */
'use strict';

define(
['react', 'store', 'lib/Utils'],
function (React, store, Utils) {
  return React.createClass({
    handleVoteClick: function() {
      if (!this.props.hasVoted()) {
        this.props.updateRowVote();
        this._storeVote();
      }
      return false;
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
            className: this.props.hasVoted() ? 'vote-box voted' : 'vote-box'}, 
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
