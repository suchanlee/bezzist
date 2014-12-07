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
        rem_str = this._getRemainingDays() + ' days remaining';
      } else {
        rem_str = '';
      }

      return (
        React.createElement("p", {className: "question-days-remaining"}, 
          rem_str
        )
      );
    }
  });
});
