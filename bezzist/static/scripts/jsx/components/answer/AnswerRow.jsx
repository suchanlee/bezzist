/** @jsx React.DOM */
'use strict';

define(
['react'],
function (React) {
  return React.createClass({
    getInitialState: function() {
      return {
        'score': this.props.answer.score
      };
    },

    incrementVote: function() {
      $.ajax({
        url: '/api/v1/answers/' + this.props.answer.id + '/',
        type: 'PUT',
        data: JSON.stringify({
          'answer': this.props.answer.answer,
          'score': this.props.answer.score + 1
        }),
        dataType: 'json'
      }).done(function(answer) {
        this.setState({
          'score': answer.score
        });
      }.bind(this));
      return false;
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
            <span className='answer-text'>{this.props.answer.answer}</span>
          </div>
          <div
            onClick={this.incrementVote}
            className='answer-vote-box'>
            <img
              className='answer-vote-icon'
              src={'/static/imgs/bezz_thumbsup.png'} />
            <p className='answer-score'>{this.state.score}</p>
          </div>
        </li>
      );
    }
  });
});
