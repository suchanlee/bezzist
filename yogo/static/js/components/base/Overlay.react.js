/* @jsx React.DOM */
'use strict';

var React = require('react'),
    EventMixin = require('../../mixins/EventMixin.react'),
    OVERLAY_EVENT = require('../../constants/BezzistConstants').Events.OVERLAY_EVENT;

var AuthForm = require('../user/AuthForm.react');

var Overlay = React.createClass({
  mixins: [EventMixin],
  getInitialState: function() {
    return {
      hidden: true,
      component: null,
      props: {},
    };
  },

  componentDidMount: function() {
    this.addListener(OVERLAY_EVENT, this.handleOverlayEvent);
  },

  componentWillUnmount: function() {
    this.removeListener(OVERLAY_EVENT, this.handleOverlayEvent);
  },

  hide: function() {
    this.setState({ hidden: true });
  },

  handleHideClick: function(e) {
    if (e.target.className === 'overlay') {
      this.hide();
    }
  },

  handleOverlayEvent: function(payload) {
    this.setState(payload);
  },

  getComponent: function() {
    return this.state.component ? React.createElement(this.state.component, this.state.props) : null;
  },

  render: function() {
    if (this.state.hidden) {
      return null;
    }
    return (
      <div className='overlay' onClick={this.handleHideClick}>
        <div className='overlay-centered-container'>
          {this.getComponent()}
        </div>
      </div>
    )
  }

});

module.exports = Overlay;
