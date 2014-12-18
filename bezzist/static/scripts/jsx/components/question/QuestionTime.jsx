/** @jsx React.DOM */
'use strict';

define(['react', 'moment'], function (React, moment) {
  return React.createClass({

    _getRemainingDays: function() {
      var expr_dt, days;
      expr_dt = moment(this.props.q.created).add(7, 'days');
      days = moment.duration(expr_dt.diff(moment())).days() + 1;
      if (days > 0) {
        return days;
      } else {
        return 0;
      }
    },

    render: function() {
      var rem_str, dates;

      if (this.props.q) {
        dates = this._getRemainingDays();
        if (dates > 0) {
          rem_str = dates + ' days left for this question';
        } else {
          rem_str = 'This question is now closed.'
        }
      } else {
        rem_str = '';
      }

      return (
        <header>
          <div className='logo-container'>
            <span>BEZZIST</span>
          </div>
          <div className='days-remaining-container'>
            <div className='days-remaining'>
              <span className='question-days-remaining'>
                {rem_str}
              </span>
            </div>
          </div>
        </header>
      );
    }
  });
});
