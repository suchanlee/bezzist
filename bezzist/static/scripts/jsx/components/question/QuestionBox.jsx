/** @jsx React.DOM */
'use strict';

define(
['react', 'jquery', 'underscore', 'store',
 'components/question/QuestionTime', 'components/answer/AnswerBox'],
function (React, $, _, store, QuestionTime, AnswerBox) {
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
        this._updateStore();
        $.getJSON('/api/v1/questions/' + this.state.q.id + '/answers')
         .done(function(answers) {
          this.setState({
            answers: answers['answers']
          });
          this.props.notifyLoaded();
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
          break;
        }
      }
    },

    _updateStore: function() {
      if (!store.get('bz-current-question') ||
          store.get('bz-current-question') !== this.state.q.id) {
        store.set('bz-current-question', this.state.q.id);
      }
      if (!store.get('bz-answers')) {
        store.set('bz-answers', {});
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
          <QuestionTime q={this.state.q} />
          <div className='list-header primary-list-header'>
            <h2>
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
