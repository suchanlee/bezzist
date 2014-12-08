/** @jsx React.DOM */
'use strict';

define(
['react', 'underscore', 'components/answer/AnswerRow'],
function (React, _, AnswerRow) {
  return React.createClass({
    seeMoreclickHandler: function() {
      this.props.toggleAnswers();
      return false;
    },

    _rowIsHidden: function(rowIdx) {
      if (rowIdx < 5) {
        return false;
      }
      return this.props.seeMore.hidden;
    },

    _getAnswers: function() {
      var answers = _.sortBy(this.props.answers, function(answer) {
        return -1 * answer.score;
      });
      return _.map(answers, function(answer, idx) {
        return React.createElement(AnswerRow, {
                answer: answer, 
                idx: idx+1, 
                hidden: this._rowIsHidden(idx), 
                updateAnswer: this.props.updateAnswer});
      }.bind(this));
    },

    render: function() {
      var answers = this._getAnswers();
      return (
        React.createElement("div", null, 
          React.createElement("ul", {className: "question-answer-list"}, 
            answers.slice(0, 5), 
            answers.slice(5), 
            React.createElement("li", {className: "question-see-more-container"}, 
              React.createElement("p", {className: "question-see-more-button", onClick: this.seeMoreclickHandler}, 
                this.props.seeMore.text
              )
            )
          )
        )
      );
    }
  });
});
