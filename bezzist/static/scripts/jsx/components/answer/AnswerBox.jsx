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

    getForm: function() {
      if (this.props.q && !this.props.q.finished) {
        return (<AnswerForm
            q={this.props.q}
            addAnswer={this.props.addAnswer}
            expandRows={this.expandRows} />);
      } else {
        return;
      }
    },

    render: function() {
      return (
        <div>
          <AnswerList
            ref='answerList'
            q={this.props.q}
            answers={this.props.answers}
            updateAnswer={this.props.updateAnswer} />
          {this.getForm()}
        </div>
      );
    }
  });
});
