import { LABELS } from "../constants/language";
import {
  DomPurify,
  generateKey,
  isMathExpression,
  resetRecentQuestions,
  mathsQuestionThread,
  mathsAnswerThread,
  unknownAnswerThread,
} from "../helpers";

import { ThreadType } from "../types";

describe("Test Helpers", function () {
  it("Test isMathExpression", async () => {
    const testData = [
      { input: "123", output: false },
      { input: "abc", output: false },
      { input: "1+1+", output: false },
      { input: "how are you", output: false },
      { input: "1+1", output: true },
      { input: "1-1", output: true },
      { input: "1*1", output: true },
      { input: "1/1+4*3", output: true },
      { input: "1/1-6+5*2", output: true },
      { input: "1/1/4+5*6", output: true },
      { input: "1/1/5/6/7+5", output: true },
    ];
    testData.forEach(({ input, output }) => {
      expect(isMathExpression(input)).toBe(output);
    });
  });

  it("Test DomPurify", async () => {
    const testData = [
      { input: "<img src=x onerror=alert(1)//>", output: '<img src="x">' },
      { input: "<svg><g/onload=alert(2)//<p>", output: "<svg><g></g></svg>" },
      {
        input: "<p>abc<iframe//src=jAva&Tab;script:alert(3)>def</p>",
        output: "<p>abc</p>",
      },
      {
        input: '<math><mi//xlink:href="data:x,<script>alert(4)</script>">',
        output: "<math><mi></mi></math>",
      },
    ];
    testData.forEach(({ input, output }) => {
      expect(DomPurify(input)).toBe(output);
    });
  });

  it("Test generateKey", async () => {
    const testData = [
      { input: "123", output: "123" },
      { input: "abcd", output: "abcd" },
      {
        input: "dbvf@#$juk",
        output: "dbvfjuk",
      },
      {
        input: "fvf fvrv vfve",
        output: "fvffvrvvfve",
      },
      {
        input: "2+2-(^)",
        output: "22",
      },
    ];
    testData.forEach(({ input, output }) => {
      expect(generateKey(input)).toBe(output);
    });
  });
});

describe("Test resetRecentQuestions helper", function () {
  let existingQuestion = [{ question: "question", questionKey: "questionKey" }];
  it("Should push question", async () => {
    existingQuestion = resetRecentQuestions(existingQuestion, "new question");
    expect(existingQuestion.length).toBe(2);
    existingQuestion = resetRecentQuestions(existingQuestion, "new question 1");
    expect(existingQuestion.length).toBe(3);
  });
  it("Should not add if its already in existing question", async () => {
    existingQuestion = resetRecentQuestions(existingQuestion, "new question");
    expect(existingQuestion.length).toBe(3);
  });
  it("Should reset the question to top if its already exist", async () => {
    existingQuestion = resetRecentQuestions(existingQuestion, "new question 1");
    expect(existingQuestion.length).toBe(3);
    expect(existingQuestion[existingQuestion.length - 1]).toMatchObject({
      question: "new question 1",
      questionKey: "newquestion1",
    });
  });
});

describe("Test mathsQuestionThread helper", function () {
  it("Should return formated question thread for maths question", async () => {
    const questionThread = mathsQuestionThread("1+1");
    const expectation = {
      thread: `${LABELS.BASIC_MATH_EXPRESSIONS} : 1+1`,
      threadKey: generateKey(`1+1-${Date.now()}`),
      threadType: ThreadType.Question,
    };
    expect(questionThread).toMatchObject(expectation);
  });
});

describe("Test mathsAnswerThread helper", function () {
  it("Should return formated answer thread for maths question", async () => {
    const answerThread = mathsAnswerThread("1+1");
    const thread = `${LABELS.BASIC_MATH_EXPRESSION_ANSWER} :  ${eval(
      "1+1".replace("--", "- -").replace("++", "+ +")
    )}`;
    const expectation = {
      thread,
      threadKey: generateKey(`${thread}-${Date.now()}`),
      threadType: ThreadType.Answer,
    };
    expect(answerThread).toMatchObject(expectation);
  });
  it("Should return formated answer thread for maths question", async () => {
    const answerThread = mathsAnswerThread("1--1");
    const thread = `${LABELS.BASIC_MATH_EXPRESSION_ANSWER} :  ${eval(
      "1--1".replace("--", "- -").replace("++", "+ +")
    )}`;
    const expectation = {
      thread,
      threadKey: generateKey(`${thread}-${Date.now()}`),
      threadType: ThreadType.Answer,
    };
    expect(answerThread).toMatchObject(expectation);
  });
});

describe("Test unknownAnswerThread helper", function () {
  it("Should return formated unknown answer thread for question", async () => {
    const answerThread = unknownAnswerThread();
    const expectation = {
      thread: LABELS.ANSWER_NOT_FOUD,
      threadKey: generateKey(`${LABELS.ANSWER_NOT_FOUD}-${Date.now()}`),
      threadType: ThreadType.Answer,
    };
    expect(answerThread).toMatchObject(expectation);
  });
});
