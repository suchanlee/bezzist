/** @jsx React.DOM */
'use strict';

define(
['react', 'lib/Utils'],
function (React, Utils) {
  return React.createClass({
    handleVoteClick: function() {
      this._updateAnswerVote();
      return false;
    },

    _updateAnswerVote: function() {
      $.ajax({
        url: '/api/v1/answers/' + this.props.answer.id + '/',
        type: 'PUT',
        data: JSON.stringify({
          'answer': this.props.answer.answer,
          'score': this.props.answer.score + 1
        }),
        dataType: 'json'
      }).done(function(answer) {
        this.props.updateAnswer(answer);
      }.bind(this));
    },

    render: function() {
      var className = 'answer-row';
      if (this.props.hidden) {
        className += ' hidden';
      }
      return (
        <li className={className}>
          <div className='answer-row-content'>
            <span className='answer-idx'>{this.props.idx}</span>
            <span className='answer-text'>
              {Utils.capitalize(this.props.answer.answer)}
            </span>
          </div>
          <div
            onClick={this.handleVoteClick}
            className='answer-vote-box'>
            <img
              className='answer-vote-icon'
              src={'/static/imgs/bezz_thumbsup.png'} />
            <p className='answer-score'>{this.props.answer.score}</p>
          </div>
        </li>
      );
    }
  });
});
