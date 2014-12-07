/** @jsx React.DOM */
'use strict';

require.config({
  baseUrl: 'static/scripts/js',
  paths: {
    components: 'components',
    router: 'router',
    views: 'views',
    jquery: '//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min',
    underscore: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min',
    backbone: '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min',
    react: 'http://fb.me/react-0.12.1.min',
    moment: '//cdnjs.cloudflare.com/ajax/libs/moment.js/2.8.4/moment.min'
  },
  shim: {
    backbone: {
      deps: [
        'underscore',
      ],
      exports: 'Backbone'
    },
    moment: {
      exports: 'moment'
    },
    react: {
      exports: 'React'
    },
    underscore: {
      exports: '_'
    }
  }
});

require(['router/Router'], function(Router) {
  var r = new Router();
});
