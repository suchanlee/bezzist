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

};