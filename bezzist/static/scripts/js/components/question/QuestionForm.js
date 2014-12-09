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
      return 'The question field cannot be empty :(';
    },

    createQuestion: function(question) {
      var data = {question: question, email: ''};
      return $.post('/api/v1/questions/', JSON.stringify(data))
    },

    render: function() {
      return (
        React.createElement(Form, {
          formError: this.getFormError(), 
          createRow: this.createQuestion, 
          addRow: this.props.addQuestion, 
          expandRows: this.props.expandRows, 
          qForm: true})
      );
    }
  });
});
