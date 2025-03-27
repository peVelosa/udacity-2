import {
  _saveQuestion,
  _saveQuestionAnswer,
  _getQuestions,
  _getUsers,
} from "./_DATA";

describe("_saveQuestion", () => {
  it("should return a saved question with all expected fields when valid data is provided", async () => {
    const questionData = {
      optionOneText: "Learn Node.js",
      optionTwoText: "Learn Python",
      author: "sarahedo",
    } as const;

    const savedQuestion = await _saveQuestion(questionData);
    expect(savedQuestion).toHaveProperty("id");
    expect(savedQuestion).toHaveProperty("timestamp");
    expect(savedQuestion.author).toBe(questionData.author);
    expect(savedQuestion.optionOne).toHaveProperty("votes");
    expect(Array.isArray(savedQuestion.optionOne.votes)).toBe(true);
    expect(savedQuestion.optionOne).toHaveProperty(
      "text",
      questionData.optionOneText
    );
    expect(savedQuestion.optionTwo).toHaveProperty("votes");
    expect(Array.isArray(savedQuestion.optionTwo.votes)).toBe(true);
    expect(savedQuestion.optionTwo).toHaveProperty(
      "text",
      questionData.optionTwoText
    );
    const questions = await _getQuestions();
    expect(questions[savedQuestion.id as keyof typeof questions]).toEqual(
      savedQuestion
    );
  });

  it("should reject with an error if incorrect data is provided", async () => {
    const invalidData = {
      optionTwoText: "Learn Python",
      author: "sarahedo",
    };

    await expect(_saveQuestion(invalidData)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});

describe("_saveQuestionAnswer", () => {
  it("should return true when valid data is provided and update the answer in the global data", async () => {
    const answerData = {
      authedUser: "sarahedo",
      qid: "8xf0y6ziyjabvozdd253nd",
      answer: "optionTwo",
    } as const;

    const result = await _saveQuestionAnswer(answerData);
    expect(result).toBe(true);
    const users = await _getUsers();
    expect(users[answerData.authedUser].answers[answerData.qid]).toBe(
      "optionTwo"
    );
    const questions = await _getQuestions();
    expect(questions["8xf0y6ziyjabvozdd253nd"].optionTwo.votes).toContain(
      "sarahedo"
    );
  });

  it("should reject with an error if incorrect data is provided", async () => {
    const invalidData = {
      authedUser: "sarahedo",
      qid: "8xf0y6ziyjabvozdd253nd",
    } as Parameters<typeof _saveQuestionAnswer>[0];

    await expect(_saveQuestionAnswer(invalidData)).rejects.toEqual(
      "Please provide authedUser, qid, and answer"
    );
  });
});
