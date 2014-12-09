/**
  * @jsx React.DOM
  * @flow
  */
'use strict';

define(
['react', 'components/answer/AnswerList', 'components/answer/AnswerForm'],
function (React, AnswerList, AnswerForm) {
  return React.createClass({
    // really hacky
    expandRows: function() {
      this.refs.answerList.refs.list.expandRows();
    },

    render: function() {
      return (
        <div>
          <AnswerList
            ref='answerList'
            answers={this.props.answers}
            updateAnswer={this.props.updateAnswer} />
          <AnswerForm
            q={this.props.q}
            addAnswer={this.props.addAnswer}
            expandRows={this.expandRows} />
        </div>
      );
    }
  });
});
