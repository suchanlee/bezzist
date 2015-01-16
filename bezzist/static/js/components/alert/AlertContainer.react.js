/** @jsx React.DOM */
'use strict';

var $ = require('jquery');
var React = require('react');
var Alert = require('./Alert.react');

var AlertContainer = React.createClass({
  getInitialState: function() {
    return {
      loaded: false,
      alerts: []
    }
  },

  componentDidMount: function() {
    $.getJSON('/api/v1/alerts/displayed').done(function(alerts) {
      this.setState({
        loaded: true,
        alerts: alerts
      });
    }.bind(this));
  },

  _getAlerts: function() {
    var alerts = [];
    for (var i=0; i < this.state.alerts.length; i++) {
      alerts.push(<Alert key={this.state.alerts[i].id} alert={this.state.alerts[i]} />);
    }
    return alerts;
  },

  render: function() {
    var hiddenClassName = !this.state.loaded ? 'hidden' : ''
    var className = 'alert-container ' + hiddenClassName;
    return (
      <div className={className}>
        {this._getAlerts()}
      </div>
    );
  }
});

module.exports = AlertContainer;