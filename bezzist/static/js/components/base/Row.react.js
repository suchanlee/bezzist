/** @jsx React.DOM */
'use strict';

/*
 * External libraries
 */
var React = require('react');
var _ = require('underscore');
var Autolinker = require('autolinker');

var Utils = require('../../lib/Utils');


var Row = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    if ((this.props.idx !== nextProps.idx) || (this.props.score !== nextProps.score)) {
      return true;
    }
    return false;
  },

  handleRowClick: function(e) {
    // if link is clicked, return.
    if (e.target.tagName === 'A') {
      return;
    }
    if (!this.props.hasVoted()) {
      this.props.vote();
    } else {
      this.props.unvote();
    }
    e.stopPropagation();
    e.preventDefault();
  },

  getContent: function() {
    return Autolinker.link(Utils.sanitizeProfanity(this.props.content), {
      newWindow: true,
      stripPrefix: false,
      phone: false,
      hashtag: false,
      truncate: 40
    });
  },

  render: function() {
    return (
      <li
        className={this.props.hasVoted() ? 'row-item voted' : 'row-item'}
        onClick={this.handleRowClick}>
        <div className='row'>
          <div className='row-content'>
            <span className='row-idx'>{this.props.idx}</span>
            <span className='row-text' dangerouslySetInnerHTML={{__html: this.getContent()}} />
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
