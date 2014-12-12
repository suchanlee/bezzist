/** @jsx React.DOM */
'use strict';

define(
['react', 'director', 'views/LandingView'],
function(React, director, LandingView) {

  var curView = null;
  var rootNode = document.getElementById('app');
  var setView = function(view) {
    if (curView) {
      React.unmountComponentAtNode(rootNode);
    }
    curView = view;
    React.renderComponent(curView, rootNode);
  };

  var router = Router({

    '/': function() {
      setView(new LandingView());
    }

  });
  router.configure({
    html5history: true
  });
  return router;
});