/**
  * @jsx React.DOM
  * @flow
  */
'use strict';

define(
['react' ,'jquery'],
function (React, $) {
  return React.createClass({
    getInitialState: function() {
      return {
        value: '',
        formError: ''
      };
    },

    handleSubmit: function() {
      if (this.state.value.trim().length === 0) {
        this._setFormError();
        return false;
      }
      this._createRow();
      return false;
    },

    handleChange: function(evt) {
      var formError = evt.target.value.trim().length > 0 ? '' : this.state.formError;
      this.setState({
        value: evt.target.value,
        formError: formError
      });
    },

    _createRow: function() {
      var promise = this.props.createRow(this.state.value);
      promise.done(function(row) {
        this.props.addRow(row);
        this.setState({
          value: ''
        });
        this._expandAndAnimate();
      }.bind(this));
    },

    // things revolving this method are hacky
    _expandAndAnimate: function() {
      var button;
      this.props.expandRows();
      if (this.props.formError.indexOf('question') > 0) {
        button = $('.question-see-more-button')[1];
      } else {
        button = $('.question-see-more-button')[0];
      }
      $('html, body').animate({
        scrollTop: $(button).offset().top - 200
      }, 1000);
    },

    _setFormError: function() {
      this.setState({
        formError: this.props.formError
      });
    },

    render: function() {
      var cx, inputContainerClass;
      cx = React.addons.classSet;
      inputContainerClass = cx({
        'text-input-container': true,
        'answer-text-input-container': this.props.answerForm,
        'question-text-input-container': this.props.qForm
      });
      return (
        <form className='answer-form'>
          <p>{this.state.formError}</p>
          <div className={inputContainerClass}>
            <input
              type='text'
              placeholder='your answer'
              value={this.state.value}
              className='text-input'
              onChange={this.handleChange} />
            <button className='form-button' onClick={this.handleSubmit}>Submit</button>
          </div>
        </form>
      );
    }
  });
});
