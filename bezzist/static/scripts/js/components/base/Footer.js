/** @jsx React.DOM */
'use strict';

define(
['react',], function (React) {
  return React.createClass({
    render: function() {
      return (
        React.createElement("footer", null, 
          React.createElement("p", null, React.createElement("a", {href: "mailto:hibezzist@gmail.com"}, "send feedback to hibezzist[@]gmail.com"))
        )
      );
    }
  });
});
