'use strict';

var $ = require('jquery');
var UserServerActionCreators = require('../actions/UserServerActionCreators');

module.exports = {

  getUser: function() {
    var promise = $.getJSON('/api/v1/profiles/active');
    promise.done(function(userprofile) {
      if (Object.keys(userprofile).length > 0) {
        UserServerActionCreators.receiveUser(userprofile);
      } else {
        UserServerActionCreators.receiveNonUser();
      }
    });
  },

};