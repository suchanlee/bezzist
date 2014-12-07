/** @jsx React.DOM */
'use strict';

define(
['react', 'components/question/QuestionBox', 'components/answer/UpcomingBox'],
function (React, QuestionBox, UpcomingBox) {
  return React.createClass({
    render: function() {
      return (
        React.createElement("div", {className: "landing"}, 
          React.createElement(QuestionBox, null), 
          React.createElement(UpcomingBox, null)
        )
      );
    }
  });
});
