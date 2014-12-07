/**
  * @jsx React.DOM
  * @flow
  */
'use strict';

define(
['react', 'components/question/QuestionList', 'components/question/QuestionForm'],
function (React, QuestionList, QuestionForm) {
  return React.createClass({
    getInitialState: function() {
      return {
        qs: []
      };
    },

    componentDidMount: function() {
      $.getJSON('/api/v1/questions/', {
        'active': 'false'
      }).done(function(qs) {
        this.setState({
          qs: qs['questions']
        });
      }.bind(this));
    },

    addQuestion: function(q) {
      this.setState({
        qs: this.state.qs.concat(q)
      });
    },

    render: function() {
      return (
        <div className='upcoming-container'>
          <div className='upcoming-header'>
            <h2 className='upcoming-header-text'>what would you like to ask?</h2>
          </div>
          <QuestionList qs={this.state.qs} />
          <QuestionForm addQuestion={this.addQuestion} />
        </div>
      );
    }
  });
});
