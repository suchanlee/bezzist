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
    QuestionViewActionCreators.upvoteQuestion(this.props.question.id);
  },

  hasVoted: function() {
    if (!UserStore.isAuthenticated() && store.get(Stores.BEZZIST_QUESTIONS).hasOwnProperty(this.props.question.id)) {
      return true;
    }
    return UserStore.containsQuestionLiked(this.props.question.id);
  },

  render: function() {
    return (
      <Row
        vote={this.vote}
        id={this.props.question.id}
        content={this.props.question.question}
        score={this.props.question.score}
        idx={this.props.idx}
        hasVoted={this.hasVoted} />
    );
  }
});

module.exports = QuestionRow;
