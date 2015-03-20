'use strict';

var React = require('react');
var Router = require('director').Router;

var LandingView = React.createFactory(require('../views/LandingView.react'));
var QuestionDetailView = React.createFactory(require('../views/QuestionDetailView.react'));

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
    setView(new LandingView());
  },
  '/questions/:questionId': function(qId) {
    setView(new QuestionDetailView({
      qId: qId
    }));
  }
});

router.configure({
  html5history: true
});

module.exports = router;