/**
  * @jsx React.DOM
  * @flow
  */
'use strict';

define(
['react'],
function (React) {
  return React.createClass({
    getInitialState: function() {
      return {
        value: '',
        email: '',
        valueError: '',
        emailError: '',
      };
    },

    submitHandler: function() {
      var data;
      if (this._setFormErrors()) {
        return false;
      }
      data = {question: this.state.value, email: this.state.email};
      $.post('/api/v1/questions/', JSON.stringify(data))
      .done(function(question) {
        this.props.addQuestion(question);
        this._resetForm();
      }.bind(this));
      return false;
    },

    handleValueChange: function(evt) {
      this.setState({
        value: evt.target.value,
      });
    },

    handleEmailChange: function(evt) {
      this.setState({
        email: evt.target.value,
      });
    },

    _setFormErrors: function() {
      var valueError, emailError, re;
      re = /\w*cornell[.]edu/;
      valueError = emailError = '';

      if (this.state.value.trim().length === 0) {
        valueError = 'The question field cannot be empty :(';
      }

      // if (!re.test(this.state.email.trim())) {
      //   emailError = 'A Cornell email is required to submit a question';
      // }

      this.setState({
        valueError: valueError,
        emailError: emailError
      });

      return valueError !== emailError;  // if errors, they are different
    },

    _resetForm: function() {
      this.setState({
        value: '',
        email: '',
        valueError: '',
        emailError: '',
      });
    },
          // <input
          //   type='email'
          //   placeholder='Your Cornell email'
          //   value={this.state.email}
          //   onChange={this.handleEmailChange} />
    render: function() {
      return (
        <form>
          <p>{this.state.valueError}</p>
          <p>{this.state.emailError}</p>
          <div className='text-input-container question-text-input-container'>
            <input
              type='text'
              placeholder='your question'
              className='text-input'
              value={this.state.value}
              onChange={this.handleValueChange} />
          </div>
          <button
            className='form-button'
            onClick={this.submitHandler}>Submit</button>
        </form>
      );
    }
  });
});
