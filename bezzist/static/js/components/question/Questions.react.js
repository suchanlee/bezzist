/** @jsx React.DOM */
'use strict';

var React = require('react');
var $ = require('jquery');
var _ = require('underscore');

var QuestionStore = require('../../stores/QuestionStore');
var UserStore = require('../../stores/UserStore');
var QuestionBox = require('./QuestionBox.react');


var getStateFromStores = function() {
  return {
    questions: QuestionStore.getActiveQuestions(),
    featuredQuestion: QuestionStore.getFeaturedQuestion()
  }
}

var Questions = React.createClass({
  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    QuestionStore.addChangeListener(this._onChange);
    UserStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    QuestionStore.removeChangeListener(this._onChange);
    UserStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  },

  render: function() {
    var questions = [];
    if (this.state.featuredQuestion) {
      questions.push(<QuestionBox
                        question={this.state.featuredQuestion}
                        key={this.state.featuredQuestion.id} />);
    }
    _.map(this.state.questions, function(question) {
      questions.push(<QuestionBox
                        question={question}
                        key={question.id} />);
    });
    return (
      <div className='questions'>
        {questions}
      </div>
    );
  },
});

module.exports = Questions;
