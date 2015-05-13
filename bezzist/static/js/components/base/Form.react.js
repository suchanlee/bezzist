/**
  * @jsx React.DOM
  * @flow
  */
'use strict';

var React = require('react'),
    $ = require('jquery'),
    EventMixin = require('../../mixins/EventMixin.react'),
    OVERLAY_EVENT = require('../../constants/BezzistConstants').Events.OVERLAY_EVENT,
    UserStore = require('../../stores/UserStore'),
    AuthForm = require('../user/AuthForm.react');


var Form = React.createClass({
  mixins: [EventMixin],
  getInitialState: function() {
    return {
      value: '',
      formError: '',
      numChars: 0
    };
  },

  handleSubmit: function(e) {
    if (!UserStore.isAuthenticated()) {
      this._displayLoginForm(this.createRow);
    } else {
      if (this.state.value.trim().length === 0) {
        this._setFormErrorOnSubmit();
      } else {
        this.createRow();
      }
    }
    e.stopPropagation();
    e.preventDefault();
  },

  handleChange: function(evt) {
    this._updateStateOnChange(evt.target.value);
  },

  getFormInfo: function() {
    if (this.state.formError.length > 0) {
      return this.state.formError;
    }
    if (this.state.numChars > 0) {
      return this.state.numChars + '/300';
    }
  },

  createRow: function() {
    var promise = this.props.createRow(this.state.value);

    // if user does not submit answer, return.
    if (!promise) {
      return;
    }

    promise.done(function(row) {
      this.setState(this.getInitialState());
      this._expandAndAnimate();
    }.bind(this));
    promise.fail(function() {
      this.setState({
        formError: 'Failed to submit. Please try again.'
      });
    }.bind(this));
  },

  _displayLoginForm: function(cb) {
    this.emit(OVERLAY_EVENT, {
      hidden: false,
      component: AuthForm,
      props: {successCb: cb}
    });
  },

  // things revolving this method are hacky
  _expandAndAnimate: function() {
    this.props.expandRows();
    $('html, body').animate({
      scrollTop: $(this.refs.listForm.getDOMNode()).offset().top - 300
    }, 1000);
  },

  _updateStateOnChange: function(val) {
    var formError = val.length > 0 ? '' : this.state.formError;
    this.setState({
      value: val,
      numChars: val.length,
      formError: formError
    });
  },

  _setFormErrorOnSubmit: function() {
    this.setState({
      formError: this.props.formError
    });
  },

  render: function() {
    var questionInputContainer = this.props.qForm ? 'question-text-input-container' : '';
    var answerInputContainer = this.props.answerForm ? 'answer-text-input-container' : '';
    var inputContainerClassName = 'text-input-container ' + answerInputContainer + questionInputContainer;
    return (
      <form className='form-container' onSubmit={this.handleSubmit} ref='listForm'>
        <div className='form-info-box'>
          <p>{this.getFormInfo()}</p>
        </div>
        <div className={inputContainerClassName}>
          <input
            type='text'
            placeholder={this.props.placeholder}
            value={this.state.value}
            className='text-input'
            maxLength='300'
            onChange={this.handleChange} />
          <button className='form-button' onClick={this.handleSubmit}>Submit</button>
        </div>
      </form>
    );
  }
});

module.exports = Form;
