/** @jsx React.DOM */
'use strict';

define(['react'], function (React) {
  return React.createClass({
    getInitialState: function() {
      return {message: 'Hello World!'};
    },
    render: function() {
      return (
        React.createElement("p", null, "7 days remaining")
      );
    }
  });
});
