/** @jsx React.DOM */
'use strict';

/*
 * External libraries
 */
var React = require('react');
var _ = require('underscore');
var Autolinker = require('autolinker');

var Utils = require('../../lib/Utils');

var UserStore = require('../../stores/UserStore');

var Row = React.createClass({
  getInitialState: function() {
    return {
      showEditBox: false,
      editModeOn: false,
      content: this.props.content,
      numChars: this.props.content,
      formError: '',
    };
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    if ((this.props.idx !== nextProps.idx)
        || (this.props.score !== nextProps.score)
        || (this.props.voted !== nextProps.voted)) {
      return true;
    }
    return false;
  },

  handleRowClick: function(e) {
    // if link is clicked, return.
    if ((e.target.tagName === 'A') || (this.state.editModeOn)) {
      return;
    }
    if (!this.props.voted) {
      this.props.vote();
      if (this.state.showEditBox) {
        this._forceSetState({ showEditBox: false });
      }
    } else {
      this.props.unvote();
    }
    e.stopPropagation();
    e.preventDefault();
  },

  getContent: function() {
    return Autolinker.link(Utils.sanitizeProfanity(this.props.content), {
      newWindow: true,
      stripPrefix: false,
      phone: false,
      hashtag: false,
      truncate: 40
    });
  },

  handleRowMouseEnter: function() {
    if (UserStore.isAnswerOwner(this.props.id)
        && (this.props.score === 0)
        && (!this.state.editModeOn)) {
      this._forceSetState({ showEditBox: true });
    }
  },

  handleRowMouseLeave: function() {
    if (this.state.showEditBox) {
      this._forceSetState({ showEditBox: false });
    }
  },

  handleEditBoxClick: function(e) {
    this._forceSetState({
      editModeOn: true,
      showEditBox: false
    });
    e.preventDefault();
    e.stopPropagation();
  },

  handleContentChange: function(e) {
    this._forceSetState({ content: e.target.value });
    this._forceSetState({ numChars: e.target.value.length });
    if (e.target.value.length > 0) {
      this._forceSetState({ formError: '' });
    }
  },

  handleContentSubmit: function(e) {
    if (this.state.numChars === 0) {
      this._forceSetState({ formError: 'The field cannot be empty :(' });
      return;
    }
    var promise = this.props.update(this.state.content);
    promise.done(function() {
      this._forceSetState({ editModeOn: false });
    }.bind(this));
    e.stopPropagation();
    e.preventDefault();
  },

  getFormInfo: function() {
    if (this.state.formError === '') {
      return this.state.content.length + '/300';
    }
    return this.state.formError;
  },

  _forceSetState: function(state) {
    this.setState(state, function() {
      this.forceUpdate();  // this is due to shouldComponentUpdate
    });
  },

  render: function() {
    var editBox = null;
    if (this.state.showEditBox) {
      editBox = (
        <div className='edit-box'
          onClick={this.handleEditBoxClick}>
          <div className='edit-box-inner'>EDIT</div>
        </div>);
    }
    var content = <span className='row-text' dangerouslySetInnerHTML={{__html: this.getContent()}} />;
    if (this.state.editModeOn) {
      content = (
        <form
          className='inline-form'
          onSubmit={this.handleContentSubmit}>
          <div className='form-info-box'>
            <p>{this.getFormInfo()}</p>
          </div>
          <input
            className='text-input row-text-input'
            maxLength='300'
            value={this.state.content}
            onChange={this.handleContentChange}
            autoFocus />
        </form>);
    }
    return (
      <li
        className={this.props.voted ? 'row-item voted' : 'row-item'}
        onClick={this.handleRowClick}>
        <div className='row'
          onMouseEnter={this.handleRowMouseEnter}
          onMouseLeave={this.handleRowMouseLeave}>
          <div className='row-content'>
            <span className='row-idx'>{this.props.idx}</span>
            {content}
          </div>
          {editBox}
          <div className='vote-box'>
            <div className='vote-box-inner'>
              <img
                className='vote-icon'
                src={'/static/imgs/icons/bezz_thumbsup.png'} />
              <p className='vote-score'>{this.props.score}</p>
            </div>
          </div>
        </div>
      </li>
    );
  }
});

module.exports = Row;
