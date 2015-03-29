/** @jsx React.DOM */
'use strict';

/*
 * General library imports
 */
var React = require('react');
var $ = require('jquery');
var _ = require('underscore');

/*
 * Action creator imports
 */
var QuestionViewActionCreators = require('../../actions/QuestionViewActionCreators');

/*
 * Store imports
 */
var QuestionStore = require('../../stores/QuestionStore');
var UserStore = require('../../stores/UserStore');

/*
 * Component imports
 */
var QuestionBox = require('./QuestionBox.react');
var Spinner = require('../base/Spinner.react');

/*
 * Constants exports
 */
var SPINNER_EVENT = require('../../constants/BezzistConstants').Events.SPINNER_EVENT;

/*
 * Mixins imports
 */
var EventMixin = require('../../mixins/EventMixin.react');


var getStateFromStores = function() {
  return {
    questions: QuestionStore.getActiveQuestions(),
    featuredQuestion: QuestionStore.getFeaturedQuestion()
  }
}

var Questions = React.createClass({

  questionPage: 0,
  mixins: [EventMixin],

  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    QuestionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    QuestionStore.removeChangeListener(this._onChange);
  },

  handleMoreQuestionsClick: function(e) {
    QuestionViewActionCreators.getPagedQuestions(QuestionStore.page + 1);
    this.emit(SPINNER_EVENT, { hidden: false });
    e.preventDefault();
    e.stopPropagation();
  },

  _onChange: function() {
    this.setState(getStateFromStores());

    // if new page of questions finished loading emit
    if (this.questionPage !== QuestionStore.page) {
      this.emit(SPINNER_EVENT, { hidden: true });
      this.questionPage += 1;
    }
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
    var showMore = null;
    if (QuestionStore.hasNext) {
      showMore = (
        <div className='questions-show-more'>
          <a onClick={this.handleMoreQuestionsClick}>See More Questions!</a>
        </div>
      );
    }
    return (
      <div className='questions'>
        {questions}
        {showMore}
        <Spinner />
      </div>
    );
  },
});

module.exports = Questions;
