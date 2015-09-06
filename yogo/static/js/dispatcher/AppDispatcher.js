'use strict';

var _ = require('underscore');
var Dispatcher = require('flux').Dispatcher;
var BezzistConstants = require('../constants/BezzistConstants');

var PayloadSources = BezzistConstants.PayloadSources;

var AppDispatcher = _.extend(new Dispatcher(), {

  /**
   * Taken from https://github.com/facebook/flux/blob/master/examples/flux-chat/js/dispatcher/ChatAppDispatcher.js
   *
   * @param {object} action The details of the action, including the action's
   * type and additional data coming from the server.
   */
  handleServerAction: function(action) {
    this.dispatch({
      source: PayloadSources.SERVER_ACTION,
      action: action
    });
  },

  /**
   * Taken from https://github.com/facebook/flux/blob/master/examples/flux-chat/js/dispatcher/ChatAppDispatcher.js
   *
   * @param {object} action The details of the action, including the action's
   * type and additional data coming from the view.
   */
  handleViewAction: function(action) {
    this.dispatch({
      source: PayloadSources.VIEW_ACTION,
      action: action
    });
  }
});

module.exports = AppDispatcher;