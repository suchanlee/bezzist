/**
  * @jsx React.DOM
  * @flow
  */
'use strict';

var React = require('react');
var $ = require('jquery');

var Form = React.createClass({
  getInitialState: function() {
    return {
      value: '',
      formError: '',
      numChars: 0
    };
  },

  handleSubmit: function(e) {
    if (this.state.value.trim().length === 0) {
      this._setFormErrorOnSubmit();
    } else {
      this._createRow();
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

  _createRow: function() {
    var promise = this.props.createRow(this.state.value);
    promise.done(function(row) {
      this.setState({
        formError: '',
        value: '',
        numChars: 0,
      });
      this._expandAndAnimate();
    }.bind(this));
    promise.fail(function() {
      this.setState({
        formError: 'Failed to submit. Please try again.'
      });
    }.bind(this));
  },

  _displayLoginForm: function() {
    alert('user is not logged in!');
  },

  // things revolving this method are hacky
  _expandAndAnimate: function() {
    var button;
    this.props.expandRows();
    if (this.props.formError.indexOf('question') > 0) {
      button = $('.expander-button')[0];
    } else {
      button = $('.expander-button')[1];
    }
    $('html, body').animate({
      scrollTop: $(button).offset().top - 200
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
      <form className='form-container' onSubmit={this.handleSubmit}>
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
