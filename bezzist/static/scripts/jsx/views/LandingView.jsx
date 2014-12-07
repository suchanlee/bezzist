/** @jsx React.DOM */
'use strict';

define(
['react', 'components/question/QuestionBox', 'components/answer/UpcomingBox'],
function (React, QuestionBox, UpcomingBox) {
  return React.createClass({
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
