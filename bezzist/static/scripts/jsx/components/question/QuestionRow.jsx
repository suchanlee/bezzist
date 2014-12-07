/**
  * @jsx React.DOM
  * @flow
  */
'use strict';

define(
['react', 'jquery'],
function (React, $) {
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
        <li className={this.getClassName()}>
          <div className='question-row-overlay'>
            <img
              src={'/static/imgs/bezz_thumbsup.png'}
              onClick={this.incrementVote} />
          </div>
          <p>{this.props.q.question}</p>
        </li>
      );
    }
  });
});
