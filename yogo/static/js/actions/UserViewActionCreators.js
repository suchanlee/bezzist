'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes = require('../constants/UserConstants').ActionTypes;

var UserApiUtils = require('../utils/UserApiUtils');

module.exports = {

  createUser: function(email, password, successCb, errCb) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.CREATE_USER,
      email: email,
      password: password
    });
    UserApiUtils.createUser(email, password, successCb, errCb);
  },

  loginUser: function(email, password, successCb, errCb) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.LOGIN_USER,
      email: email,
      password: password
    });
    UserApiUtils.loginUser(email, password, successCb, errCb);
  },

};