/** @jsx React.DOM */
'use strict';

var React = require('react');
var $ = require('jquery');
var store = require('store');
var Row = require('../base/Row.react');

var AnswerRow = React.createClass({
  getStoreKey: function() {
    return 'bz-answers';
  },

  updateAnswerVote: function() {
    $.ajax({
      url: '/api/v1/answers/' + this.props.answer.id + '/incrementScore',
      type: 'POST',
      data: {
        'csrfmiddlewaretoken': $('#csrf input').val()
      },
    }).done(function(answer) {
      this.props.updateAnswer(answer);
    }.bind(this));
  },

  hasVoted: function() {
    if (store.get(this.getStoreKey()).hasOwnProperty(this.props.answer.id) ||
      this.props.isFinished) {
      return true;
    } else {
      return false;
    }
  },

  render: function() {
    return (
      <Row
        storeKey={this.getStoreKey()}
        updateRowVote={this.updateAnswerVote}
        id={this.props.answer.id}
        content={this.props.answer.answer}
        score={this.props.answer.score}
        idx={this.props.idx}
        hasVoted={this.hasVoted} />
    );
  }
});

module.exports = AnswerRow;