'use strict';

var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var AppDispatcher = require('../dispatcher/AppDispatcher');

var UserConstants = require('../constants/UserConstants');
var BezzistConstants = require('../constants/BezzistConstants');

var CHANGE_EVENT = BezzistConstants.Events.CHANGE;

var _user = null;

var UserStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

});

AppDispatcher.register(function(payload) {

  var ActionTypes = UserConstants.ActionTypes;
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.RECEIVE_USER:
      alert('received user!');

    case ActionTypes.RECEIVE_NON_USER:
      alert('no user!');

    default:
      // no op
  }


});

module.exports = UserStore;