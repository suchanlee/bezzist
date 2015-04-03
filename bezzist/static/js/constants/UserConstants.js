'use strict';

var keymirror = require('keymirror');

module.exports = {

  Points: {
    '100': 'VIRGIN BEE',
    '101': 'NEWBEE',
    '250': 'BUMBLE BEE',
    '500': 'WORKER BEE',
    '1000': 'EXPLORER BEE',
    '1500': 'DIGGER BEE',
    '2500': 'MINER BEE',
    '5000': 'HONEY BEE',
    '10000': 'SOCIALITE BEE',
    '20000': 'MAYOR BEE',
    '50000': 'PRESIDENT BEE',
    '100000': 'KING BEE',
    '1000000': 'QUEEN BEE',
    '-1': 'THE BIG BEE ON CAMPUS',
  },

  PointsPerAction: {
    CREATE: 10,
    VOTE: 1
  },

  ActionTypes: keymirror({
    RECEIVE_USER: null,
    RECEIVE_NON_USER: null,
    CREATE_USER: null,
    LOGIN_USER: null,
    INCREMENT_USER_POINTS: null,
    DECREMENT_USER_POINTS: null
  })

};
