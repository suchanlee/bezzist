/** @jsx React.DOM */
'use strict';

var React = require('react')

var Footer = React.createClass({
  render: function() {
    return (
      <footer>
        <p><a href="mailto:hibezzist@gmail.com">send feedback to hibezzist[@]gmail.com</a></p>
      </footer>
    );
  }
});

module.exports = Footer;