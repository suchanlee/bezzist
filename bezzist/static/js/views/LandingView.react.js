/** @jsx React.DOM */
'use strict';

var React = require('react'),

    BezzistConstants = require('../constants/BezzistConstants'),

    QuestionViewActionCreators = require('../actions/QuestionViewActionCreators'),
    UserApiUtils = require('../utils/UserApiUtils'),

    QuestionStore = require('../stores/QuestionStore'),

    AlertContainer = require('../components/alert/AlertContainer.react'),
    Questions = require('../components/question/Questions.react'),
    UpcomingBox = require('../components/answer/UpcomingBox.react'),
    Overlay = require('../components/base/Overlay.react'),
    Nav = require('../components/base/Nav.react');

// poll interval object
var pollInterval;

var LandingView = React.createClass({
  getInitialState: function() {
    return {
      loaded: false
    }
  },

  componentDidMount: function() {
    // initialize questions and user
    QuestionViewActionCreators.getQuestions({ active: false });
    QuestionViewActionCreators.getQuestions({ featured: true });
    QuestionViewActionCreators.getPagedQuestions(QuestionStore.page + 1);
    UserApiUtils.getUser();

    // initialize polling
    pollInterval = setInterval(function() {
      QuestionViewActionCreators.getQuestions({ featured: true });
      for (var i = 0; i < QuestionStore.page; i++) {
        QuestionViewActionCreators.getQuestions({ page: i + 1, active: true });
      }
    }, BezzistConstants.POLLING_TIMEOUT_MILLIS);
  },

  componentWillUnmount: function() {
    clearInterval(pollInterval);
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
      </div>
    );
  }
});

module.exports = LandingView;
