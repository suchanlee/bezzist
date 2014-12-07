/**
  * @jsx React.DOM
  * @flow
  */
'use strict';

define(
['react', 'components/question/QuestionRow'],
function (React, QuestionRow) {
  return React.createClass({
    render: function() {
      var rows = this.props.qs.map(function(q, idx) {
        if ((idx + 1) % 3 === 0) {
          return <QuestionRow q={q} last={true} />;
        } else {
          return <QuestionRow q={q} />;
        }
      });
      return (
        <ul className='question-list'>
          {rows}
        </ul>
      );
    }
  });
});
