// This file bootstraps the entire application.
var router = require('./router/Router');
var React = require('react');
window.React = React; // export for http://fb.me/react-devtools

router.init();