/** @jsx React.DOM */
'use strict';

var React = require('react'),
    moment = require('moment');

var QuestionTime = React.createClass({
  getRemainingDays: function() {
    var expiryDate, remainingDays;
    expiryDate = moment(this.props.q.published).add(7, 'days');
    remainingDays = moment.duration(expiryDate.diff(moment())).days() + 1;
    if (remainingDays > 0) {
      return remainingDays;
    } else {
      return 0;
    }
  },

  render: function() {
    var days = this.getRemainingDays();
    if (days > 0) {
      if (days === 1) {
        days += ' DAY';
      } else {
        days += ' DAYS';
      }
      return (
        <div className='days-remaining-container'>
          <div className='days-remaining'>
            <p className='question-days-remaining'>{days} TO VOTE</p>
            <p className='question-days-vote-now'>VOTE NOW</p>
          </div>
          <img className='vote-pointer' src={'/static/imgs/icons/fingerdown.png'} />
        </div>
      );
    } else {
      return (
        <div className='days-remaining-container'>
          <div className='days-remaining'>
            <p className='question-days-remaining'>QUESTION CLOSED</p>
          </div>
        </div>
      );
    }
  }
});

module.exports = QuestionTime;
