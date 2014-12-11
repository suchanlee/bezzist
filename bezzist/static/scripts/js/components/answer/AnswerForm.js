/**
  * @jsx React.DOM
  * @flow
  */
'use strict';

define(
['react', 'components/base/Form'],
function (React, Form) {
  return React.createClass({
    getFormError: function() {
      return 'The answer field cannot be empty :(';
    },

    createAnswer: function(answer) {
      var data = {qId: this.props.q.id, answer: answer};
      return $.post('/api/v1/answers/', JSON.stringify(data));
    },

    render: function() {
      return (
        React.createElement(Form, {
          formError: this.getFormError(), 
          createRow: this.createAnswer, 
          addRow: this.props.addAnswer, 
          expandRows: this.props.expandRows, 
          placeholder: "add new answer", 
          answerForm: true})
      );
    }
  });
});
