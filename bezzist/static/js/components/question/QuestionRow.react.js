/**
  * @jsx React.DOM
  * @flow
  */
'use strict';

var React = require('react');
var $ = require('jquery');
var store = require('store');

var QuestionViewActionCreators = require('../../actions/QuestionViewActionCreators');
var Stores = require('../../constants/BezzistConstants').Stores;
var UserStore = require('../../stores/UserStore');

var Row = require('../base/Row.react');

var QuestionRow = React.createClass({
  vote: function() {
    QuestionViewActionCreators.upvoteQuestion(this.props.question.getId());
  },

  unvote: function() {
    QuestionViewActionCreators.unvoteQuestion(this.props.question.getId());
  },

  hasVoted: function() {
    if (!UserStore.isAuthenticated() && store.get(Stores.BEZZIST_QUESTIONS).hasOwnProperty(this.props.question.getId())) {
      return true;
    }
    return UserStore.containsQuestionLiked(this.props.question.getId());
  },

  render: function() {
    return (
      <Row
        vote={this.vote}
        unvote={this.unvote}
        id={this.props.question.getId()}
        content={this.props.question.getQuestion()}
        score={this.props.question.getScore()}
        idx={this.props.idx}
        hasVoted={this.hasVoted} />
    );
  }
});

module.exports = QuestionRow;
