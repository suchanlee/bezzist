/** @jsx React.DOM */
'use strict';

define(
['react', 'components/question/QuestionBox', 'components/answer/UpcomingBox',
 'components/base/Footer', 'store'],
function (React, QuestionBox, UpcomingBox, Footer, store) {
  return React.createClass({
    getInitialState: function() {
      return {
        loaded: false
      }
    },

    componentDidMount: function() {
      if (!store.enabled) {
        alert("Bezzist does not work in Safari's Private Mode. We are sorry for the inconvinience.");
      }
    },

    notifyLoaded: function() {
      this.setState({
        loaded: true
      });
    },

    render: function() {
      var cx, content;
      cx = React.addons.classSet;
      content = cx({
        'hidden': !this.state.loaded
      });
      return (
        React.createElement("div", {className: "landing"}, 
          React.createElement("div", {className: content}, 
            React.createElement("header", null, 
              React.createElement("div", {className: "logo-container"}, 
                React.createElement("span", null, "BEZZIST")
              )
            ), 
            React.createElement(UpcomingBox, null), 
            React.createElement(QuestionBox, {notifyLoaded: this.notifyLoaded}), 
            React.createElement(Footer, null)
          )
        )
      );
    }
  });
});
