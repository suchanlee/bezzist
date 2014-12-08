/** @jsx React.DOM */
'use strict';

define(['react', 'moment'], function (React, moment) {
  return React.createClass({

    _getRemainingDays: function() {
      var expr_dt;
      expr_dt = moment(this.props.q.created).add(7, 'days');
      return moment.duration(expr_dt.diff(moment())).days() + 1;
    },

    render: function() {
      var rem_str;

      if (this.props.q) {
        rem_str = this._getRemainingDays() + ' days left for this question';
      } else {
        rem_str = '';
      }

      return (
        <header>
          <div className='logo-container'>
            <span>Bezzist</span>
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
