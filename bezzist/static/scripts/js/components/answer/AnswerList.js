/** @jsx React.DOM */
'use strict';

define(
['react', 'components/answer/AnswerRow'],
function (React, AnswerRow) {
  return React.createClass({
    render: function() {
      var visible_answers, hidden_answers;
      visible_answers = this.props.answers.slice(0, 5).map(function(answer, idx) {
        return React.createElement(AnswerRow, {answer: answer, idx: idx+1, hidden: false});
      });
      hidden_answers = this.props.answers.slice(5).map(function(answer, idx) {
        return React.createElement(AnswerRow, {answer: answer, idx: idx+6, hidden: this.props.seeMore.hidden});
      }.bind(this));
      return (
        React.createElement("div", null, 
          React.createElement("ul", {className: "question-answer-list"}, 
            visible_answers, 
            hidden_answers, 
            React.createElement("li", {className: "question-see-more-container"}, 
              React.createElement("p", {className: "question-see-more-button", onClick: this.props.toggleAnswers}, 
                this.props.seeMore.text
              )
            )
          )
        )
      );
    }
  });
});
