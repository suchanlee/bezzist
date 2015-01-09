/** @jsx React.DOM */
'use strict';

define(
['react', 'components/alert/Alert'],
function (React, Alert) {
  return React.createClass({
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
        alerts.push(<Alert alert={this.state.alerts[i]} />);
      }
      return alerts;
    },

    render: function() {
      var cx, className;
      cx = React.addons.classSet;
      className = cx({
        'hidden': !this.state.loaded,
        'alert-container': true
      });
      return (
        <div className={className}>
          {this._getAlerts()}
        </div>
      );
    }
  });
});
