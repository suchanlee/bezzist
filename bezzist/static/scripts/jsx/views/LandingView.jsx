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
        <div className='landing'>
          <div className={content}>
            <header>
              <div className='logo-container'>
                <span>BEZZIST</span>
              </div>
            </header>
            <UpcomingBox />
            <QuestionBox notifyLoaded={this.notifyLoaded} />
            <Footer />
          </div>
        </div>
      );
    }
  });
});
