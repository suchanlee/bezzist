/** @jsx React.DOM */
'use strict';

var React = require('react');

/*
 * Constants
 */
var BezzistConstants = require('../constants/BezzistConstants');

/*
 * Stores
 */
var QuestionStore = require('../stores/QuestionStore');
var UserStore = require('../stores/UserStore');

/*
 * Actions
 */
var QuestionViewActionCreators = require('../actions/QuestionViewActionCreators');

/*
 * ApiUtils
 */
var QuestionApiUtils = require('../utils/QuestionApiUtils');
var AnswerApiUtils = require('../utils/AnswerApiUtils');
var UserApiUtils = require('../utils/UserApiUtils');

/*
 * React components
 */
var Overlay = require('../components/base/Overlay.react');
var Nav = require('../components/base/Nav.react');
var QuestionBox = require('../components/question/QuestionBox.react');
var AlertContainer = require('../components/alert/AlertContainer.react');

// poll interval object
var pollInterval;

var QuestionDetailView = React.createClass({

  getInitialState: function() {
    return this._getStateFromStores();
  },

  componentDidMount: function() {
    QuestionStore.addChangeListener(this._onChange);
    UserStore.addChangeListener(this._onChange);
    QuestionApiUtils.getQuestion(this.props.qId);
    AnswerApiUtils.getAnswersForQuestion(this.props.qId);
    UserApiUtils.getUser();

    // initialize polling
    pollInterval = setInterval(function() {
      QuestionViewActionCreators.getQuestion(this.props.qId);
    }.bind(this), BezzistConstants.POLLING_TIMEOUT_MILLIS);
  },

  componentWillUnmount: function() {
    QuestionStore.removeChangeListener(this._onChange);
    UserStore.removeChangeListener(this._onChange);
    clearInterval(pollInterval);
  },

  _getStateFromStores: function() {
    return {
      question: QuestionStore.getQuestion(this.props.qId)
    }
  },

  _onChange: function() {
    return this.setState(this._getStateFromStores());
  },

  render: function() {
    var questionBox = this.state.question ? <QuestionBox question={this.state.question} /> : null;
    return (
      <div>
        <Overlay />
        <Nav />
        <div className='landing'>
          <AlertContainer />
          {questionBox}
        </div>
      </div>
    )
  }

});

module.exports = QuestionDetailView;
