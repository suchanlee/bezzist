/** @jsx React.DOM */
'use strict';

var React = require('react'),

    QuestionApiUtils = require('../utils/QuestionApiUtils'),
    AnswerApiUtils = require('../utils/AnswerApiUtils'),
    UserApiUtils = require('../utils/UserApiUtils'),

    AlertContainer = require('../components/alert/AlertContainer.react'),
    Questions = require('../components/question/Questions.react'),
    UpcomingBox = require('../components/answer/UpcomingBox.react'),
    Footer = require('../components/base/Footer.react'),
    Overlay = require('../components/base/Overlay.react'),
    Nav = require('../components/base/Nav.react');

var LandingView = React.createClass({
  getInitialState: function() {
    return {
      loaded: false
    }
  },

  componentDidMount: function() {
    QuestionApiUtils.getQuestions({ active: false }); // initialize questions
    QuestionApiUtils.getQuestions({ featured: true });
    QuestionApiUtils.getPagedQuestions({ active: true });
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
          </div>
        </div>
        <Footer />
      </div>
    );
  }
});

module.exports = LandingView;
