/** @jsx React.DOM */
'use strict';

var React = require('react');
var $ = require('jquery');
var store = require('store');

var Row = require('../base/Row.react');

var AnswerViewActionCreators = require('../../actions/AnswerViewActionCreators');
var Stores = require('../../constants/BezzistConstants').Stores;
var UserStore = require('../../stores/UserStore');

var AnswerRow = React.createClass({
  vote: function() {
    AnswerViewActionCreators.upvoteAnswer(this.props.question.getId(), this.props.answer.getId());
  },

  unvote: function() {
    AnswerViewActionCreators.unvoteAnswer(this.props.question.getId(), this.props.answer.getId());
  },

  hasVoted: function() {
    if (!UserStore.isAuthenticated() && store.get(Stores.BEZZIST_ANSWERS).hasOwnProperty(this.props.answer.getId())) {
      return true;
    }
    return UserStore.containsAnswerLiked(this.props.answer.getId());
  },

  render: function() {
    return (
      <Row
        vote={this.vote}
        unvote={this.unvote}
        id={this.props.answer.getId()}
        content={this.props.answer.getAnswer()}
        score={this.props.answer.getScore()}
        idx={this.props.idx}
        hasVoted={this.hasVoted} />
    );
  }
});

module.exports = AnswerRow;