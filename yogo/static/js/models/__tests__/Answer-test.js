jest.dontMock('../Answer');
jest.dontMock('../Answers');
jest.dontMock('../../constants/BezzistConstants');
jest.dontMock('../../constants/AnswerConstants');
jest.dontMock('../../stores/UserStore');
jest.dontMock('../../stores/BaseStore');

var Answer = require('../Answer');
var Answers = require('../Answers');
var AnswerConstants = require('../../constants/AnswerConstants');
var moment = require('moment');

var simpleAnswer = {
  id: 100,
  answer: 'This is a simple answer!',
  score: 1000,
  created: new Date(),
  modified: new Date()
};


describe('Answer', function() {
  it('creates an answer', function() {
    var answer = new Answer(
      simpleAnswer.id,
      simpleAnswer.answer,
      simpleAnswer.score,
      simpleAnswer.created,
      simpleAnswer.modified);
    expect(answer.getId()).toBe(simpleAnswer.id);
    expect(answer.getScore()).toBe(simpleAnswer.score);
    expect(answer.getCreated()).toBe(moment(simpleAnswer.created));
    expect(answer.getModified()).toBe(moment(simpleAnswer.modified));
    expect(answer.getAnswer()).toBe(simpleAnswer.answer);
  });
});