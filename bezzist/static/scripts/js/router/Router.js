/** @jsx React.DOM */
'use strict';

define(
['react', 'backbone', 'views/LandingView'],
function(React, Backbone, LandingView) {

  var curView = null;
  var rootNode = document.getElementById('app');
  var setView = function(view) {
    if (curView) {
      React.unmountComponentAtNode(rootNode);
    }
    curView = view;
    React.renderComponent(curView, rootNode);
  };

  return Backbone.Router.extend({

    initialize: function() {
      Backbone.history.start();
    },

    routes: {
      '': 'landing',
    },

    'landing': function() {
      setView(new LandingView());
    }

  });

});
