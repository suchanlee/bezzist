/**
  * @jsx React.DOM
  * @flow
  */
'use strict';

define(
['react', 'components/answer/AnswerList', 'components/answer/AnswerForm'],
function (React, AnswerList, AnswerForm) {
  return React.createClass({
    getInitialState: function() {
      return {
        seeMore: {
          hidden: true,
          text: 'show more answers'
        }
      };
    },

    toggleHiddenAnswers: function() {
      if (this.state.seeMore.hidden) {
        this.setState({
          seeMore: {
            hidden: false,
            text: 'hide answers'
          }
        });
      } else {
        this.setState({
          seeMore: {
            hidden: true,
            text: 'show more answers'
          }
        });
      }
    },

    render: function() {
      return (
        <div>
          <AnswerList
            answers={this.props.answers}
            toggleAnswers={this.toggleHiddenAnswers}
            updateAnswer={this.props.updateAnswer}
            seeMore={this.state.seeMore} />
          <AnswerForm
            q={this.props.q}
            addAnswer={this.props.addAnswer}
            toggleAnswers={this.toggleHiddenAnswers} />
        </div>
      );
    }
  });
});
