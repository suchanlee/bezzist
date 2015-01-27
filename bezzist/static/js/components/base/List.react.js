/**
  * @jsx React.DOM
  * @flow
  */
'use strict';

var React = require('react');

var List = React.createClass({
  getInitialState: function() {
    return {
      expanded: false
    };
  },

  seeMoreclickHandler: function(e) {
    this._toggleRows();
    e.stopPropagation();
    e.preventDefault();
  },

  rowIsHidden: function(rowIdx) {
    if (rowIdx < 5) {
      return false;
    }
    return !this.state.expanded;
  },

  expandRows: function() {
    if (!this.state.expanded) {
      this._toggleRows();
    }
  },

  _toggleRows: function() {
    this.setState({
      expanded: !this.state.expanded
    });
  },

  _expandButtonText: function() {
    if (this.state.expanded) {
      return 'Hide';
    } else {
      return 'Show More';
    }
  },

  render: function() {
    var showMoreClassName = 'expander-container ';
    if (this.props.rows.length < 6) {
      showMoreClassName += 'hidden';
    }
    var toggleRowsClassName = 'list ';
    if (!this.state.expanded) {
      toggleRowsClassName += 'hidden'
    }
    // TODO (suchanl): remove the classname hack below
    return (
      <div className={this.props.qList ? 'question-list' : ''}>
        <ul className='list'>
          {this.props.rows.slice(0, 5)}
        </ul>
        <ul className={toggleRowsClassName}>
          {this.props.rows.slice(5)}
        </ul>
        <div className={showMoreClassName}>
          <p
            className='expander-button'
            onClick={this.seeMoreclickHandler}>
            {this._expandButtonText()}
          </p>
        </div>
      </div>
    );
  }
});

module.exports = List;
