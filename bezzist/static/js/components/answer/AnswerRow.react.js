/** @jsx React.DOM */
'use strict';

var React = require('react');
var $ = require('jquery');
var store = require('store');
var Row = require('../base/Row.react');
var AnswerViewActionCreators = require('../../actions/AnswerViewActionCreators');
var Stores = require('../../constants/BezzistConstants').Stores;

var AnswerRow = React.createClass({
  vote: function() {
    return AnswerViewActionCreators.upvoteAnswer(this.props.question.id, this.props.answer.id);
  },

  hasVoted: function() {
    if (store.get(Stores.BEZZIST_ANSWERS).hasOwnProperty(this.props.answer.id) ||
      this.props.question.finished) {
      return true;
    } else {
      return false;
    }
  },

  render: function() {
    return (
      <Row
        vote={this.vote}
        id={this.props.answer.id}
        content={this.props.answer.answer}
        score={this.props.answer.score}
        idx={this.props.idx}
        hasVoted={this.hasVoted} />
    );
  }
});

module.exports = AnswerRow;