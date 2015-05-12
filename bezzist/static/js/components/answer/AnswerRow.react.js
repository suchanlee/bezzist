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
    AnswerViewActionCreators.upvoteAnswer(this.props.question.getId(), this.props.answer.id);
  },

  unvote: function() {
    AnswerViewActionCreators.unvoteAnswer(this.props.question.getId(), this.props.answer.id);
  },

  hasVoted: function() {
    if (!UserStore.isAuthenticated() && store.get(Stores.BEZZIST_ANSWERS).hasOwnProperty(this.props.answer.id)) {
      return true;
    }
    return UserStore.containsAnswerLiked(this.props.answer.id);
  },

  render: function() {
    return (
      <Row
        vote={this.vote}
        unvote={this.unvote}
        id={this.props.answer.id}
        content={this.props.answer.answer}
        score={this.props.answer.score}
        idx={this.props.idx}
        hasVoted={this.hasVoted} />
    );
  }
});

module.exports = AnswerRow;