/** @jsx React.DOM */
'use strict';

var React = require('react');
var store = require('store');
var AlertContainer = require('../components/alert/AlertContainer.react');
var QuestionBox = require('../components/question/QuestionBox.react');
var UpcomingBox = require('../components/answer/UpcomingBox.react');
var Footer = require('../components/base/Footer.react');

var LandingView = React.createClass({
  getInitialState: function() {
    return {
      loaded: false
    }
  },

  componentDidMount: function() {
    if (!store.enabled) {
      alert("Bezzist does not work in Safari's Private Mode. We are sorry for the inconvinience.");
    }
  },

  notifyLoaded: function() {
    this.setState({
      loaded: true
    });
  },

  render: function() {
    var className = !this.state.loaded ? 'hidden' : '';
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
