/** @jsx React.DOM */
'use strict';

var React = require('react');
var store = require('store');
var AlertContainer = require('../components/alert/AlertContainer.react');
var QuestionBox = require('../components/question/QuestionBox.react');
var QuestionApiUtils = require('../utils/QuestionApiUtils');
var AnswerApiUtils = require('../utils/AnswerApiUtils');
var UpcomingBox = require('../components/answer/UpcomingBox.react');
var Footer = require('../components/base/Footer.react');

QuestionApiUtils.getAllQuestions(); // initialize questions
AnswerApiUtils.getActiveAndFeaturedAnswers(); //initialize answers

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
    var className = !this.state.loaded ? '' : '';
    return (
      <div className='landing'>
        <AlertContainer />
        <div className={className}>
          <header>
            <div className='logo-container'>
              <span>BEZZIST</span>
            </div>
          </header>
          <UpcomingBox />
          <QuestionBox notifyLoaded={this.notifyLoaded} />
          <Footer />
        </div>
      </div>
    );
  }
});

module.exports = LandingView;
