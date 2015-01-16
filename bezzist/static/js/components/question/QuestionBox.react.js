/** @jsx React.DOM */
'use strict';

var React = require('react');
var $ = require('jquery');
var _ = require('underscore');
var store = require('store');
var QuestionRow = require('../../stores/QuestionStore');
var QuestionTime = require('./QuestionTime.react');
var AnswerBox = require('../answer/AnswerBox.react');


// var getStateFromStores = function() {
//   return {
//     questions: QuestionStore.getAll()
//   }
// }

var QuestionBox = React.createClass({
  getInitialState: function() {
    // return getStateFromStores();
    return {
      q: null,
      answers: []
    };
  },

  componentDidMount: function() {
    // QuestionStore.addChangeListener(this._onChange);
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

  componentWillUnmount: function() {
    QuestionStore.removeChangeListener(this._onChange);
  },

  addAnswer: function(answer) {
    this.setState({
      answers: this.state.answers.concat(answer)
    });
  },

  updateAnswer: function(answer) {
    var answers = this.state.answers;
    for (var i=0; i<answers.length; i++) {
      if (answers[i].id === answer.id) {
        var answerKeySet = Object.keys(answer);
        if (Object.keys(answers[i]).length === answerKeySet.length) {
          answers[i] = answer;
        } else {
          _.map(answerKeySet, function(key) {
            answers[i][key] = answer[key];
          });
        }
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
      <div className="question-box">
        <div className='list-header primary-list-header'>
          <h2>
            {this._getQuestionText()}
          </h2>
        </div>
        <QuestionTime q={this.state.q} />
        <AnswerBox
          q={this.state.q}
          answers={this.state.answers}
          addAnswer={this.addAnswer}
          updateAnswer={this.updateAnswer} />
      </div>
    );
  },

  // _onChange: function() {
  //   this.setState(getStateFromStores());
  // }
});

module.exports = QuestionBox;
