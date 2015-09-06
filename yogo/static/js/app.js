// This file bootstraps the entire application.
var router = require('./router/Router');
var store = require('store');
var React = require('react');
window.React = React; // export for http://fb.me/react-devtools

var maybeInitializeStore = function() {
  if (!store.enabled) {
    alert("Please enable Cookies and LocalStorage to use Bezzist. " +
          "Safari private browsing mode is not supported. " +
          "We are sorry for the inconvenience.");
  } else {
    if (!store.get('bz-answers')) {
      store.set('bz-answers', {});
    }
    if (!store.get('bz-questions')) {
      store.set('bz-questions', {});
    }
  }
};

maybeInitializeStore();
router.init();