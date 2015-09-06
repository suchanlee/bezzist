'use strict';

var $ = require('jquery');
var docCookies = require('../lib/cookies');
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

  createUser: function(email, password, successCb, errCb) {
    var promise = $.post('/api/v1/profiles/create', {
      email: email,
      password: password,
      csrfmiddlewaretoken: docCookies.getItem('csrftoken')
    });
    promise.done(function(userprofile) {
      UserServerActionCreators.receiveUser(userprofile, successCb);
    });
    promise.fail(function(err) {
      errCb(err.responseText);
    });
  },

  loginUser: function(email, password, successCb, errCb) {
    var promise = $.post('/api/v1/profiles/login', {
      email: email,
      password: password,
      csrfmiddlewaretoken: docCookies.getItem('csrftoken')
    });
    promise.done(function(userprofile) {
      UserServerActionCreators.receiveUser(userprofile, successCb);
    });
    promise.fail(function(err) {
      errCb(err.responseText);
    });
  },

};