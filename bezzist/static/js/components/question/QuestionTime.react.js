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

  getDates: function() {
    var dates;
    if (this.props.q) {
      dates = this.getRemainingDays();
      if (dates > 0) {
        return dates + ' days left for this question';
      } else {
        return 'This question is now closed.';
      }
    } else {
      return '';
    }
  },

  render: function() {
    return (
      <div className='days-remaining-container'>
        <div className='days-remaining'>
          <span className='question-days-remaining'>
            {this.getDates()}
          </span>
        </div>
      </div>
    );
  }
});

module.exports = QuestionTime;
