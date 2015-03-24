/** @jsx React.DOM */
'use strict';

var React = require('react')

var Footer = React.createClass({
  render: function() {
    return (
      <footer>
        <div>
          <ul className='footer-list'>
            <li className='footer-list-item'><a href='#'>ABOUT BEZZIST</a></li>
            <li className='footer-list-item'><a href='#'>RULES</a></li>
            <li className='footer-list-item'><a href='#'>TERMS OF SERVICE</a></li>
          </ul>
        </div>
        <p className='footer-copyright'>&copy; 2015 Bezzist</p>
      </footer>
    );
  }
});

module.exports = Footer;