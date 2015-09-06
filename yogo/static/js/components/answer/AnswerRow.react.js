/** @jsx React.DOM */
'use strict';

/*
 * External libraries
 */
var $ = require('jquery');
var React = require('react');
var store = require('store');

/*
 * Action creator imports
 */
var AnswerViewActionCreators = require('../../actions/AnswerViewActionCreators');

/*
 * Constant imports
 */
var BezzistConstants = require('../../constants/BezzistConstants');
var Stores = BezzistConstants.Stores;

/*
 * Store imports
 */
var UserStore = require('../../stores/UserStore');
var AnswerStore = require('../../stores/AnswerStore');

/*
 * Component imports
 */
var Row = require('../base/Row.react');


var AnswerRow = React.createClass({

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

  update: function(answer) {
    return AnswerViewActionCreators.updateAnswer(
      this.props.question.getId(),
      this.props.answer.getId(),
      answer);
  },

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

  isOwner: function(id) {
    return UserStore.isAnswerOwner(id);
  },

  getScore: function() {
    if (this.props.question.isHideScoreUntilFinished()) {
      return BezzistConstants.HIDDEN_SCORE;
    }
    return this.props.answer.getScore();
  },

  render: function() {
    return (
      <Row
        update={this.update}
        vote={this.vote}
        unvote={this.unvote}
        id={this.props.answer.getId()}
        content={this.props.answer.getAnswer()}
        score={this.getScore()}
        idx={this.props.idx}
        voted={this.state.voted}
        isOwner={this.isOwner} />
    );
  }
});

module.exports = AnswerRow;