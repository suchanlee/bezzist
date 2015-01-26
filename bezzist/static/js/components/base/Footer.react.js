/** @jsx React.DOM */
'use strict';

var React = require('react')

var Footer = React.createClass({
  render: function() {
    return (
      <footer>
        <p><a href="mailto:hello@bezzist.com">send feedback to hello[@]bezzist.com</a></p>
      </footer>
    );
  }
});

module.exports = Footer;