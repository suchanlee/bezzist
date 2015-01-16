/** @jsx React.DOM */
'use strict';

var $ = require('jquery');
var React = require('react');
var store = require('store');

var Alert = React.createClass({
  storeKey: 'bz-alert-list',
  getInitialState: function() {
    return {
      hidden: true,
    };
  },

  componentDidMount: function() {
    this._maybeSetupStore();
    this._maybeShowAlert();
  },

  _maybeSetupStore: function() {
    if (!store.get(this.storeKey)) {
      store.set(this.storeKey, {});
    }
  },

  _maybeShowAlert: function() {
    if (!(this.props.alert.id in store.get(this.storeKey))) {
      this.setState({
        hidden: false,
      });
    }
  },

  _getFormattedContent: function() {
    var paragraphs, formattedContent;
    paragraphs = this.props.alert.content.split('\n');
    formattedContent = '';
    for (var i=0; i < paragraphs.length; i++) {
      if (paragraphs[i].trim().length > 0) {
        formattedContent += '<p>' + paragraphs[i] + '</p>';
      }
    }
    return formattedContent;
  },

  _foreverHideAlert: function() {
    if (this.props.alert.id) {
      var hiddenAlertsList = store.get(this.storeKey);
      hiddenAlertsList[this.props.alert.id] = true;
      store.set(this.storeKey, hiddenAlertsList);
    }
    this.setState({
      hidden: true
    });
  },

  hideClickHandler: function(e) {
    this._foreverHideAlert();
    e.stopPropagation();
    e.preventDefault();
  },

  render: function() {
    var className;
    className = 'alert alert-' + this.props.alert.alert_type.toLowerCase();
    if (this.state.hidden) {
      className += ' hidden';
    }
    return (
      <div className={className}>
        <div className='alert-content' dangerouslySetInnerHTML={{__html: this._getFormattedContent()}} />
        <a
          href='#'
          onClick={this.hideClickHandler}>
          <img
            className='alert-close-icon'
            src={'/static/imgs/icons/close-icon-white.png'} />
        </a>
      </div>
    );
  }
});

module.exports = Alert;
