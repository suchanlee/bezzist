/** @jsx React.DOM */
'use strict';

var React = require('react')

var Footer = React.createClass({
  render: function() {
    return (
      <footer>
        <ul className='footer-list'>
          <li className='footer-list-item'><a href='/about'>ABOUT BEZZIST</a></li>
          <li className='footer-list-item'><a href='/rules'>RULES</a></li>
          <li className='footer-list-item'><a href='/terms'>TERMS OF SERVICE</a></li>
        </ul>
        <p className='footer-copyright'>&copy; 2015 Bezzist</p>
      </footer>
    );
  }
});

module.exports = Footer;