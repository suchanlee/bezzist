/**
  * @jsx React.DOM
  * @flow
  */
'use strict';

define(
['react', 'jquery', 'lib/Utils'],
function (React, $, Utils) {
  return React.createClass({
    getClassName: function() {
      var c = 'question-row';
      if (this.props.last) {
        c += ' question-row-last';
      }
      return c;
    },

    incrementVote: function(evt) {
      var img = $(evt.target);
      $.ajax({
        url: '/api/v1/questions/' + this.props.q.id + '/',
        type: 'PUT',
        data: JSON.stringify({
          'question': this.props.q.question,
          'score': this.props.q.score + 1
        }),
        dataType: 'json'
      }).done(function(q) {
        var overlay = img.parent();
        img.hide();
        overlay.html('<p>Thanks for liking!</p>')
      })
      return false;
    },

    render: function() {
      return (
        React.createElement("li", {className: this.getClassName()}, 
          React.createElement("div", {className: "question-row-overlay"}, 
            React.createElement("img", {
              src: '/static/imgs/bezz_thumbsup.png', 
              onClick: this.incrementVote})
          ), 
          React.createElement("p", null, Utils.capitalize(this.props.q.question))
        )
      );
    }
  });
});
