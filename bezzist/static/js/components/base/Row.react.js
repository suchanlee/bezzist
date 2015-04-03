/** @jsx React.DOM */
'use strict';

var React = require('react');
var _ = require('underscore');
var Utils = require('../../lib/Utils');

var Row = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    if ((this.props.idx !== nextProps.idx) || (this.props.score !== nextProps.score)) {
      return true;
    }
    return false;
  },

  handleVoteClick: function(e) {
    if (!this.props.hasVoted()) {
      this.props.vote();
    } else {
      this.props.unvote();
    }
    e.stopPropagation();
    e.preventDefault();
  },

  render: function() {
    return (
      <li
        className={this.props.hasVoted() ? 'row-item voted' : 'row-item'}
        onClick={this.handleVoteClick}>
        <div className='row'>
          <div className='row-content'>
            <span className='row-idx'>{this.props.idx}</span>
            <span className='row-text'>
              {Utils.capitalize(this.props.content)}
            </span>
          </div>
          <div className='vote-box'>
            <div className='vote-box-inner'>
              <img
                className='vote-icon'
                src={'/static/imgs/icons/bezz_thumbsup.png'} />
              <p className='vote-score'>{this.props.score}</p>
            </div>
          </div>
        </div>
      </li>
    );
  }
});

module.exports = Row;
