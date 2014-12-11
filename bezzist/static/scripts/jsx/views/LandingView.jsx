/** @jsx React.DOM */
'use strict';

define(
['react', 'components/question/QuestionBox', 'components/answer/UpcomingBox',
 'store'],
function (React, QuestionBox, UpcomingBox, store) {
  return React.createClass({
    componentDidMount: function() {
      if (!store.enabled) {
        alert("Bezzist does not work in Safari's Private Mode. We are sorry for the inconvinience.");
      }
    },

    render: function() {
      return (
        <div className='landing'>
          <QuestionBox />
          <UpcomingBox />
        </div>
      );
    }
  });
});
