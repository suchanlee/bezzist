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
        <li className='answer-row'>
          <div className='answer-row-content'>
            <span className='answer-idx'>{this.props.idx}</span>
            <span className='answer-text'>
              {Utils.capitalize(this.props.content)}
            </span>
          </div>
          <div
            onClick={this.handleVoteClick}
            className={this._hasVoted() ? 'answer-vote-box voted' : 'answer-vote-box'}>
            <img
              className='answer-vote-icon'
              src={'/static/imgs/bezz_thumbsup.png'} />
            <p className='answer-score'>{this.props.score}</p>
          </div>
        </li>
      );
    }
  });
});
