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
var Stores = require('../../constants/BezzistConstants').Stores;

var QuestionRow = React.createClass({
  vote: function() {
    QuestionViewActionCreators.upvoteQuestion(this.props.question.id);
  },

  hasVoted: function() {
    if (store.get(Stores.BEZZIST_QUESTIONS).hasOwnProperty(this.props.question.id)) {
      return true;
    } else {
      return false;
    }
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
