/** @jsx React.DOM */
'use strict';

var React = require('react');
var _ = require('underscore');
var store = require('store');
var Utils = require('../../lib/Utils');

var Row = React.createClass({
  handleVoteClick: function(e) {
    if (!this.props.hasVoted()) {
      this.props.updateRowVote();
      this._storeVote();
    }
    e.stopPropagation();
    e.preventDefault();
  },

  _storeVote: function() {
    var update = {};
    update[this.props.id] = true;
    store.set(this.props.storeKey, _.extend(store.get(this.props.storeKey), update));
  },

  render: function() {
    return (
      <li className='row'>
        <div className='row-content'>
          <span className='row-idx'>{this.props.idx}</span>
          <span className='row-text'>
            {Utils.capitalize(this.props.content)}
          </span>
        </div>
        <div
          onClick={this.handleVoteClick}
          className={this.props.hasVoted() ? 'vote-box voted' : 'vote-box'}>
          <div className='vote-box-inner'>
            <img
              className='vote-icon'
              src={'/static/imgs/icons/bezz_thumbsup.png'} />
            <p className='vote-score'>{this.props.score}</p>
          </div>
        </div>
      </li>
    );
  }
});

module.exports = Row;