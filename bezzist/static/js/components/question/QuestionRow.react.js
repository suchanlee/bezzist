/**
  * @jsx React.DOM
  * @flow
  */
'use strict';

var React = require('react');
var $ = require('jquery');
var store = require('store');
var Row = require('../base/Row.react');
var QuestionViewActionCreators = require('../../actions/QuestionViewActionCreators');

var QuestionRow = React.createClass({
  getStoreKey: function() {
    return 'bz-questions';
  },

  updateQuestionVote: function() {
    QuestionViewActionCreators.upvoteQuestion(this.props.question.id);
  },

  hasVoted: function() {
    if (store.get(this.getStoreKey()).hasOwnProperty(this.props.question.id)) {
      return true;
    } else {
      return false;
    }
  },

  render: function() {
    return (
      <Row
        storeKey={this.getStoreKey()}
        updateRowVote={this.updateQuestionVote}
        id={this.props.question.id}
        content={this.props.question.question}
        score={this.props.question.score}
        idx={this.props.idx}
        hasVoted={this.hasVoted} />
    );
  }
});

module.exports = QuestionRow;
