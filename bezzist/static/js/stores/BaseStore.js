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
   * Change event constant.
   *
   * Default: CHANGE
   */
  _changeEvent: CHANGE_EVENT,

  /**
   * Override the change event constant
   *
   * @param {string} changeEvent change event constant
   */
  setChangeEvent: function(changeEvent) {
    this._changeEvent = changeEvent;
  },

  /**
   * Emits the CHANGE event out to those
   * subscribed to this event.
   */
  emitChange: function() {
    this.emit(this._changeEvent);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(this._changeEvent, callback);
    console.log(this._changeEvent);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(this._changeEvent, callback);
  },

});


/*
 * Module export declaration
 */
module.exports = BaseStore;
