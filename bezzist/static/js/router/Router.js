'use strict';

var React = require('react');
var Router = require('director').Router;

var LandingView = require('../views/LandingView.react');
var QuestionDetailView = require('../views/QuestionDetailView.react');

var curView = null;
var rootNode = document.getElementById('app');
var setView = function(view) {
  if (curView) {
    React.unmountComponentAtNode(rootNode);
  }
  curView = view;
  React.render(curView, rootNode);
};

var router = new Router({
  '/': function() {
    setView(React.createFactory(LandingView)());
  },
  '/questions/:questionId': function(qId) {
    setView(React.createFactory(QuestionDetailView)({
      qId: qId
    }));
  }
});

router.configure({
  html5history: true
});

module.exports = router;