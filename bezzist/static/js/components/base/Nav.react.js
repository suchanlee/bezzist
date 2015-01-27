/* @jsx React.DOM */
'use strict';

var React = require('react'),
    $ = require('jquery'),

    UserStore = require('../../stores/UserStore'),
    AuthForm = require('../user/AuthForm.react'),
    Overlay = require('./Overlay.react'),
    OVERLAY_EVENT = require('../../constants/BezzistConstants').Events.OVERLAY_EVENT,
    EventMixin = require('../../mixins/EventMixin.react');


var Nav = React.createClass({
  mixins: [EventMixin],
  getInitialState: function() {
    return this._getStateFromStores();
  },

  componentDidMount: function() {
    UserStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    UserStore.removeChangeListener(this._onChange);
  },

  handleLoginClick: function() {
    this._displayLoginForm()
  },

  handleLogoClick: function() {
    $('html, body').animate({ scrollTop: 0 }, 1000);
  },

  _displayLoginForm: function(cb) {
    this.emit(OVERLAY_EVENT, {
      hidden: false,
      component: AuthForm,
      props: {successCb: cb}
    });
  },

  _onChange: function() {
    this.setState(this._getStateFromStores());
  },

  _getUserInfo: function() {
    // TODO: things related to logout was done in a pinch
    // and is a mess.
    if (this.state.user) {
      return (
        <span className='nav-user'>
          <span>{UserStore.getPointStatus()}: {this.state.user.score} points</span>
          <a className='nav-logout' href='/profiles/logout'>Log out</a>
        </span>
      );
    } else {
      return (
        <span className='nav-login'>
          <a href='javascript:void(0)' onClick={this.handleLoginClick}>Log In</a>
        </span>
      );
    }
  },

  _getStateFromStores: function() {
    return {
      user: UserStore.getUser()
    }
  },

  render: function() {
    return (
      <nav>
        <div className='nav-container'>
          <img
            className='nav-logo-img'
            src={'/static/imgs/logo/bezlogo.png'}
            onClick={this.handleLogoClick} />
          <span
            className='nav-logo'
            onClick={this.handleLogoClick}>BEZZIST</span>
          {this._getUserInfo()}
        </div>
      </nav>
    )
  }

});

module.exports = Nav;