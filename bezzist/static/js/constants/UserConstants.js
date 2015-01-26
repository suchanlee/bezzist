'use strict';

var keyMirror = require('keyMirror');

module.exports = {

  ActionTypes: keyMirror({
    RECEIVE_USER: null,
    RECEIVE_NON_USER: null,
    CREATE_USER: null,
    LOGIN_USER: null
  })

};
