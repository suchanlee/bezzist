/**
  * @jsx React.DOM
  * @flow
  */
'use strict';

define(
['react', 'underscore'],
function (React, _) {
  return React.createClass({
    getInitialState: function() {
      return {
        expanded: false
      };
    },

    seeMoreclickHandler: function() {
      this._toggleRows();
      return false;
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
        return 'hide';
      } else {
        return 'show more';
      }
    },

    render: function() {
      var cx, showMoreClassname, toggleRowsClassname;
      cx = React.addons.classSet;
      showMoreClassname = cx({
        'expander-container': true,
        'hidden': this.props.rows.length < 6
      });
      toggleRowsClassname = cx({
        'list': true,
        'hidden': !this.state.expanded
      });
      // TODO (suchanl): remove the classname hack below
      return (
        <div className={this.props.qList ? 'question-list' : ''}>
          <ul className='list'>
            {this.props.rows.slice(0, 5)}
          </ul>
          <ul className={toggleRowsClassname}>
            {this.props.rows.slice(5)}
          </ul>
          <div className={showMoreClassname}>
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
});
