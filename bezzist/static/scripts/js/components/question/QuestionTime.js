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

    getDates: function() {
      var dates;
      if (this.props.q) {
        dates = this._getRemainingDays();
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
        React.createElement("header", null, 
          React.createElement("div", {className: "logo-container"}, 
            React.createElement("span", null, "BEZZIST")
          ), 
          React.createElement("div", {className: "days-remaining-container"}, 
            React.createElement("div", {className: "days-remaining"}, 
              React.createElement("span", {className: "question-days-remaining"}, 
                this.getDates()
              )
            )
          )
        )
      );
    }
  });
});
