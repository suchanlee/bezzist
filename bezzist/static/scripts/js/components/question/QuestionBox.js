/** @jsx React.DOM */
'use strict';

define(
['react', 'jquery', 'components/question/QuestionTime', 'components/answer/AnswerBox'],
function (React, $, QuestionTime, AnswerBox) {
  return React.createClass({
    getInitialState: function() {
      return {
        q: null,
        answers: []
      };
    },

    componentDidMount: function() {
      $.getJSON('/api/v1/questions/', {
        'active': 'true'
      }).done(function(qList) {
        if (this.isMounted()) {
          this.setState({
            q: qList['questions'][0]
          });
        }
        $.getJSON('/api/v1/questions/' + this.state.q.id + '/answers')
         .done(function(answers) {
          this.setState({
            answers: answers['answers']
          });
        }.bind(this));
      }.bind(this));
    },

    addAnswer: function(answer) {
      this.setState({
        answers: this.state.answers.concat(answer)
      });
    },

    _getQuestionText: function() {
      var q = '';
      if (this.state.q) {
        q = this.state.q.question;
      }
      return q;
    },

    render: function() {
      return (
        React.createElement("div", null, 
          React.createElement("div", {className: "question-box"}, 
            React.createElement("h2", {className: "question-text"}, 
              this._getQuestionText()
            )
          ), 
          React.createElement(AnswerBox, {
            q: this.state.q, 
            answers: this.state.answers, 
            addAnswer: this.addAnswer})
        )
      );
    }
  });
});
