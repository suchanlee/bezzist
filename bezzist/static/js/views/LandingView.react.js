/** @jsx React.DOM */
'use strict';

var React = require('react'),
    store = require('store'),

    QuestionApiUtils = require('../utils/QuestionApiUtils'),
    AnswerApiUtils = require('../utils/AnswerApiUtils'),
    UserApiUtils = require('../utils/UserApiUtils'),

    AlertContainer = require('../components/alert/AlertContainer.react'),
    Questions = require('../components/question/Questions.react'),
    Answers = require('../components/answer/Answers.react'),
    Overlay = require('../components/base/Overlay.react'),
    Nav = require('../components/base/Nav.react');


QuestionApiUtils.getAllQuestions(); // initialize questions
AnswerApiUtils.getActiveAndFeaturedAnswers(); //initialize answers
UserApiUtils.getUser();

var maybeInitializeStore = function() {
  if (!store.get('bz-answers')) {
    store.set('bz-answers', {});
  }
  if (!store.get('bz-questions')) {
    store.set('bz-questions', {});
  }
};

maybeInitializeStore();

var LandingView = React.createClass({
  getInitialState: function() {
    return {
      loaded: false
    }
  },

  componentDidMount: function() {
    if (!store.enabled) {
      alert("Please enable Cookies and LocalStorage to use Bezzist. " +
            "Safari private browsing mode is not supported. " +
            "We are sorry for the inconvenience.");
    }
  },

  notifyLoaded: function() {
    this.setState({
      loaded: true
    });
  },

  render: function() {
    return (
      <div>
        <Overlay />
        <Nav />
        <div className='landing'>
          <AlertContainer />
          <div className='qna'>
            <Questions notifyLoaded={this.notifyLoaded} />
            <Answers />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = LandingView;
