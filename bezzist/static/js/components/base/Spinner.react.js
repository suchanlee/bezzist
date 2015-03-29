/**
 * Spinner
 *
 * Spinner object.
 * Event emitter can be used to show and hide the spinner.
 */

/* @jsx React.DOM */
'use strict';

/*
 * General library imports
 */
var React = require('react');

/*
 * Mixins imports
 */
var EventMixin = require('../../mixins/EventMixin.react');

/*
 * Constants exports
 */
var SPINNER_EVENT = require('../../constants/BezzistConstants').Events.SPINNER_EVENT;


var Spinner = React.createClass({

  mixins: [EventMixin],

  getInitialState: function() {
    return { hidden: true }
  },

  componentDidMount: function() {
    this.addListener(SPINNER_EVENT, this.handleSpinnerEvent);
  },

  componentWillUnmount: function() {
    this.removeListener(SPINNER_EVENT, this.handleSpinnerEvent);
  },

  handleSpinnerEvent: function(payload) {
    this.setState(payload);
  },

  render: function() {
    var spinner = (
      <div className='loader'>Loading...</div>
    );
    if (!(this.state.hidden)) {
      return spinner;
    } else {
      return null;
    }
  }

});

module.exports = Spinner;