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
      this._createAnswer();
      return false;
    },

    handleChange: function(evt) {
      var formError = this.state.formError;
      if (evt.target.value.trim().length > 0) {
        formError = '';
      }
      this.setState({
        value: evt.target.value,
        formError: formError
      });
    },

    getClassName: function() {
      if (this.props.hidden) {
        return 'answer-form hidden';
      } else {
        return 'answer-form';
      }
    },

    _createAnswer: function() {
      var data = {qId: this.props.q.id, answer: this.state.value};
      $.post('/api/v1/answers/', JSON.stringify(data))
      .done(function(answer) {
        this.props.addAnswer(answer);
        this.setState({
          value: ''
        });
        this._toggleAnswersAndAnimate();
      }.bind(this));
    },

    _toggleAnswersAndAnimate: function() {
      if (this.props.seeMore.hidden) {
        this.props.toggleAnswers();
      }
      $('html, body').animate({
        scrollTop: $('.question-see-more-button').offset().top - 200
      }, 1000);
    },

    _setFormError: function() {
      this.setState({
        formError: 'The answer field cannot be empty :('
      });
    },

    render: function() {
      return (
        React.createElement("form", {className: this.getClassName()}, 
          React.createElement("p", null, this.state.formError), 
          React.createElement("div", {className: "text-input-container answer-text-input-container"}, 
            React.createElement("input", {
              type: "text", 
              placeholder: "your answer", 
              value: this.state.value, 
              className: "text-input", 
              onChange: this.handleChange}), 
            React.createElement("button", {className: "form-button", onClick: this.handleSubmit}, "Submit")
          )
        )
      );
    }
  });
});
