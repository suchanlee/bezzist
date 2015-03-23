'use strict';

var EventEmitter = require('eventemitter3');

var events = new EventEmitter();

var EventMixin = {

  addListener: function(evt, handler) {
    events.addListener(evt, handler);
  },

  removeListener: function(evt, handler) {
    events.removeListener(evt, handler);
  },

  emit: function(evt, payload) {
    events.emit(evt, payload);
  }

};

module.exports = EventMixin;