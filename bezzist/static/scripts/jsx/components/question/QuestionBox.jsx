/** @jsx React.DOM */
'use strict';

define(
['react', 'jquery', 'underscore',
 'components/question/QuestionTime', 'components/answer/AnswerBox'],
function (React, $, _, QuestionTime, AnswerBox) {
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

    updateAnswer: function(a) {
      var answers = this.state.answers;
      for (var i=0; i<answers.length; i++) {
        if (answers[i].id === a.id) {
          answers[i] = a;
          this.setState({
            answers: answers
          });
          console.log(answers);
          break;
        }
      }
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
        <div>
          <div className='question-box'>
            <h2 className='question-text'>
              {this._getQuestionText()}
            </h2>
          </div>
          <AnswerBox
            q={this.state.q}
            answers={this.state.answers}
            addAnswer={this.addAnswer}
            updateAnswer={this.updateAnswer} />
        </div>
      );
    }
  });
});
