/** @jsx React.DOM */
'use strict';

var React = require('react');
var $ = require('jquery');
var store = require('store');

var Row = require('../base/Row.react');

var AnswerViewActionCreators = require('../../actions/AnswerViewActionCreators');
var QuestionViewActionCreators = require('../../actions/QuestionViewActionCreators');
var Stores = require('../../constants/BezzistConstants').Stores;
var UserStore = require('../../stores/UserStore');

var AnswerRow = React.createClass({
  vote: function() {
    if (this.props.answer.question) {
      return QuestionViewActionCreators.upvoteQuestion(this.props.answer.id);
    } else {
      return AnswerViewActionCreators.upvoteAnswer(this.props.question.id, this.props.answer.id);
    }
  },

  hasVoted: function() {
    if (this.props.question.finished) {
      return true;
    }
    if (this.props.answer.question) {
      if (!UserStore.isAuthenticated() && store.get(Stores.BEZZIST_QUESTIONS).hasOwnProperty(this.props.answer.id)) {
        return true;
      }
      return UserStore.containsQuestionLiked(this.props.answer.id);
    } else {
      if (!UserStore.isAuthenticated() && store.get(Stores.BEZZIST_ANSWERS).hasOwnProperty(this.props.answer.id)) {
        return true;
      }
      return UserStore.containsAnswerLiked(this.props.answer.id);
    }
  },

  render: function() {
    var content;
    if (this.props.answer.question) {
      content = this.props.answer.question;
    } else {
      content = this.props.answer.answer;
    }
    return (
      <Row
        vote={this.vote}
        id={this.props.answer.id}
        content={content}
        score={this.props.answer.score}
        idx={this.props.idx}
        hasVoted={this.hasVoted} />
    );
  }
});

module.exports = AnswerRow;