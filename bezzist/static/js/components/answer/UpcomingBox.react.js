/**
  * @jsx React.DOM
  * @flow
  */
'use strict';

var React = require('react');
var $ = require('jquery');
var _ = require('underscore');
var store = require('store');
var QuestionList = require('../question/QuestionList.react');
var QuestionForm = require('../question/QuestionForm.react');


var UpcomingBox = React.createClass({


  // addQuestion: function(q) {
  //   this.setState({
  //     qs: this.state.qs.concat(q)
  //   });
  // },

  // updateQuestion: function(q) {
  //   var qs = this.state.qs;
  //   for (var i=0; i<qs.length; i++) {
  //     if (qs[i].id === q.id) {
  //       var questionKeySet = Object.keys(q);
  //       if (Object.keys(qs[i]).length === questionKeySet.length) {
  //         qs[i] = q;
  //       } else {
  //         _.map(questionKeySet, function(key) {
  //           qs[i][key] = q[key];
  //         });
  //       }
  //       this.setState({
  //         qs: qs
  //       });
  //       break;
  //     }
  //   }
  // },

  expandRows: function() {
    return this.refs.questionList.refs.list.expandRows();
  },

  render: function() {
    return (
      <div className='upcoming-container'>
        <div className='list-header secondary-list-header'>
          <h2>what would you like to ask the cornell community?</h2>
        </div>
        <QuestionList
          ref='questionList' />
        <QuestionForm expandRows={this.expandRows} />
      </div>
    );
  }
});

module.exports = UpcomingBox;