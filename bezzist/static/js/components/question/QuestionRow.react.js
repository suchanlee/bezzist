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
  getInitialState: function() {
    return { voted: this.hasVoted() };
  },

  componentDidMount: function() {
    UserStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    UserStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({ voted: this.hasVoted() });
  },

  update: function(questionText) {
    return QuestionViewActionCreators.updateQuestion(this.props.question.getId(), questionText)
  },

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
        update={this.update}
        vote={this.vote}
        unvote={this.unvote}
        id={this.props.question.getId()}
        content={this.props.question.getQuestion()}
        score={this.props.question.getScore()}
        idx={this.props.idx}
        voted={this.state.voted} />
    );
  }
});

module.exports = QuestionRow;
