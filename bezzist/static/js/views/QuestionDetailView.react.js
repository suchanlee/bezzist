/** @jsx React.DOM */
'use strict';

var React = require('react');

/*
 * Stores
 */
var QuestionStore = require('../stores/QuestionStore');
var UserStore = require('../stores/UserStore');

/*
 * ApiUtils
 */
var QuestionApiUtils = require('../utils/QuestionApiUtils');
var AnswerApiUtils = require('../utils/AnswerApiUtils');
var UserApiUtils = require('../utils/UserApiUtils');

/*
 * React components
 */
var Footer = require('../components/base/Footer.react');
var Overlay = require('../components/base/Overlay.react');
var Nav = require('../components/base/Nav.react');
var QuestionBox = require('../components/question/QuestionBox.react');
var AlertContainer = require('../components/alert/AlertContainer.react');

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
  },

  componentWillUnmount: function() {
    QuestionStore.removeChangeListener(this._onChange);
    UserStore.removeChangeListener(this._onChange);
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
