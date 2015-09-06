jest.dontMock('../Question');
jest.dontMock('../Questions');
jest.dontMock('../../constants/BezzistConstants');
jest.dontMock('../../constants/QuestionConstants');
jest.dontMock('../../stores/UserStore');
jest.dontMock('../../stores/BaseStore');

var Question = require('../Question');
var Questions = require('../Questions');
var QuestionConstants = require('../../constants/QuestionConstants');
var moment = require('moment');

var simpleQuestionResponse = {
  id: 25,
  question: 'This is a simple question!',
  score: 20,
  active: true,
  featured: false,
  locked: false,
  created: new Date(),
  modified: new Date(),
  published: new Date()
};

var getDefaultQuestion = function() {
  return new Question(
      simpleQuestionResponse.id,
      simpleQuestionResponse.question,
      simpleQuestionResponse.score,
      simpleQuestionResponse.active,
      simpleQuestionResponse.featured,
      simpleQuestionResponse.locked,
      simpleQuestionResponse.created,
      simpleQuestionResponse.modified,
      simpleQuestionResponse.published_datetime);
}

describe('Question', function() {
  it('creates a question', function() {
    var question = getDefaultQuestion();
    expect(question.getId()).toBe(simpleQuestionResponse.id);
    expect(question.getQuestion()).toBe(simpleQuestionResponse.question);
    expect(question.getScore()).toBe(simpleQuestionResponse.score);
    expect(question.isActive()).toBe(simpleQuestionResponse.active);
    expect(question.isFeatured()).toBe(simpleQuestionResponse.featured);
    expect(question.isLocked()).toBe(simpleQuestionResponse.locked);
    expect(question.getCreated()).toBe(moment(simpleQuestionResponse.created));
    expect(question.getModified()).toBe(moment(simpleQuestionResponse.modified));
    expect(question.getPublished()).toBe(moment(simpleQuestionResponse.published_datetime));
  });
});

describe('Question', function() {
  it('increments and decrements score', function() {
    var question = getDefaultQuestion();
    expect(question.getScore()).toBe(simpleQuestionResponse.score);
    question.incrementScore();
    expect(question.getScore()).toBe(simpleQuestionResponse.score + 1);
    question.decrementScore();
    expect(question.getScore()).toBe(simpleQuestionResponse.score );
  });
});

describe('Question', function() {
  it('decrements the score more times that the current score', function() {
    var question = getDefaultQuestion();
    var positiveNum = 10;
    var defaultScore = 0;
    for (var i = 0; i < simpleQuestionResponse.score + positiveNum; i++) {
      question.decrementScore();
    }
    expect(question.getScore()).toBe(defaultScore);
  });
});

describe('Questions', function() {
  it('creates a temporary question', function() {
    var questionString = 'This is the question';
    var question = Questions.createTemp(questionString);
    expect(question.getQuestion()).toBe(questionString);
    expect(question.getId()).toBe(QuestionConstants.TMP_QUESTION_ID);
  });
});

describe('Questions', function() {
  it('creates a default question', function() {
    var id = 1337;
    var questionString = 'This is the question';
    var question = Questions.createDefault(id, questionString);
    expect(question.getQuestion()).toBe(questionString);
    expect(question.getId()).toBe(id);
  });
});
