/**
 * Base class for (Flux) Stores.
 *
 * Provides little functionality other than
 * event emitting functionalities.
 */

'use strict';

/*
 * Events-related imports
 */
var EventEmitter = require('eventemitter3');
var assign = require('object-assign');

/*
 * Constant import
 */
var CHANGE_EVENT = require('../constants/BezzistConstants').Events.CHANGE;


/*
 * BaseStore object
 */
var BaseStore = assign({}, EventEmitter.prototype, {

  /**
   * Emits the CHANGE event out to those
   * subscribed to this event.
   */
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


/*
 * Module export declaration
 */
module.exports = BaseStore;
