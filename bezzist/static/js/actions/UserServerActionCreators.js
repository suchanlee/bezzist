'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/UserConstants').ActionTypes;


module.exports = {

  receiveUser: function(userprofile, cb) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_USER,
      userprofile: userprofile,
      cb: cb
    });
  },

  receiveNonUser: function() {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_NON_USER
    });
  },

  incrementPoints: function(increment) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.INCREMENT_USER_POINTS,
      increment: increment
    });
  },

  decrementPoints: function(decrement) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.DECREMENT_USER_POINTS,
      decrement: decrement
    });
  },

};