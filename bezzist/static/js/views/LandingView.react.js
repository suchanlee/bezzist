/** @jsx React.DOM */
'use strict';

var React = require('react'),
    store = require('store'),

    QuestionApiUtils = require('../utils/QuestionApiUtils'),
    AnswerApiUtils = require('../utils/AnswerApiUtils'),
    UserApiUtils = require('../utils/UserApiUtils'),

    AlertContainer = require('../components/alert/AlertContainer.react'),
    Questions = require('../components/question/Questions.react'),
    UpcomingBox = require('../components/answer/UpcomingBox.react'),
    Footer = require('../components/base/Footer.react'),
    Overlay = require('../components/base/Overlay.react'),
    Nav = require('../components/base/Nav.react');


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
    QuestionApiUtils.getAllQuestions(); // initialize questions
    AnswerApiUtils.getActiveAndFeaturedAnswers(); //initialize answers
    UserApiUtils.getUser();
  },

  notifyLoaded: function() {
    this.setState({
      loaded: true
    });
  },

  render: function() {
    var className = !this.state.loaded ? '' : '';
    return (
      <div>
        <Overlay />
        <Nav />
        <div className='landing'>
          <AlertContainer />
          <div className={className}>
            <UpcomingBox />
            <Questions notifyLoaded={this.notifyLoaded} />
            <Footer />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = LandingView;
