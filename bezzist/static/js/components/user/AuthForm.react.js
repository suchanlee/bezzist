/* @jsx React.DOM */
'use strict';

var React = require('react'),
    $ = require('jquery'),

    EventMixin = require('../../mixins/EventMixin.react'),
    OVERLAY_EVENT = require('../../constants/BezzistConstants').Events.OVERLAY_EVENT,

    UserViewActionCreators = require('../../actions/UserViewActionCreators'),
    Regex = require('../../constants/BezzistConstants').Regex;

var AuthForm = React.createClass({
  mixins: [EventMixin],
  getInitialState: function() {
    return {
      signup: false,
      email: '',
      password: '',
      passwordConfirm: '',
      emailError: '',
      passwordError: ''
    };
  },

  _getTransformButtonText: function() {
    return this.state.signup ? 'LOG IN' : 'SIGN UP';
  },

  _isInputValid: function() {
    var emailError = '',
        passwordError = '';
    if (this.state.signup) {
        if (this.state.password !== this.state.passwordConfirm) {
          passwordError = 'Passwords do not match.'
        }
    }
    if (!Regex.EMAIL.test(this.state.email) || this.state.email.indexOf('@cornell.edu') === -1) {
      emailError = 'Please correctly format Cornell email';
    }
    this.setState({
      emailError: emailError,
      passwordError: passwordError
    });
    if (emailError !== '' || passwordError !== '') {
      return false;
    }
    return true;
  },

  _getHelpText: function() {
    if (this.state.signup) {
      return 'Sign up with your @cornell.edu email';
    } else {
      return 'Log in with your @cornell.edu email';
    }
  },

  authFailCb: function(emailError) {
    this.setState({ emailError: emailError });
  },

  createSuccessCb: function() {
    location.reload();
  },

  loginSuccessCb: function() {
    location.reload();
  },

  handleFormTransformClick: function(e) {
    this.setState({ signup: !this.state.signup });
    e.preventDefault();
    e.stopPropagation();
  },

  handleInputChange: function(e) {
    var state = {};
    state[e.target.name] = e.target.value;
    this.setState(state);
  },

  handleKeyUp: function(e) {
    //TODO implement me -- close overlay on ESC press
  },

  handleSubmit: function(e) {
    if (this._isInputValid()) {
      if (this.state.signup) {
        UserViewActionCreators.createUser(
          this.state.email,
          this.state.password,
          this.createSuccessCb,
          this.authFailCb);
      } else {
        UserViewActionCreators.loginUser(
          this.state.email,
          this.state.password,
          this.loginSuccessCb,
          this.authFailCb);
      }
    }
    e.preventDefault();
    e.stopPropagation();
  },

  render: function() {
    var signupInputClass = this.state.signup ? '' : 'hidden';
    return (
      <div className='auth-form' onKeyUp={this.handleKeyUp}>
        <h2>Welcome to Bezzist!</h2>
        <p>{this._getHelpText()}</p>
        <form onSubmit={this.handleSubmit}>
          <p className='form-error'>{this.state.emailError}</p>
          <input
            name='email'
            type='email'
            onChange={this.handleInputChange}
            placeholder='@cornell.edu email' />
          <p className='form-error'>{this.state.passwordError}</p>
          <input
            name='password'
            type='password'
            onChange={this.handleInputChange}
            placeholder='password' />
          <input
            name='passwordConfirm'
            className={signupInputClass}
            type='password'
            onChange={this.handleInputChange}
            placeholder='confirm password' />
          <a className='auth-form-button auth-form-signup' href='#' onClick={this.handleFormTransformClick}>{this._getTransformButtonText()}</a>
          <button type='submit' className='auth-form-button auth-form-submit' href='#' onClick={this.handleSubmit}>SUBMIT</button>
        </form>
      </div>
    )
  }

});

module.exports = AuthForm;