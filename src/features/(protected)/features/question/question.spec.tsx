import "@testing-library/jest-dom";
import { QuestionPage } from "./";
import { renderWithProviders } from "@/store/test-provider";
import { MemoryRouter, Route, Routes } from "react-router";
import * as redux from "@/store/hooks";

const preloadedState = {
  auth: {
    user: {
      id: "user1",
      password: "password", // dummy value
      name: "Test User",
      avatarURL: "http://example.com/avatar.png",
      answers: {},
      questions: [],
    },
    isAuthenticated: true,
  },
  questions: {
    questions: [
      {
        id: "q1",
        author: "user1",
        timestamp: 1467166872634,
        optionOne: {
          votes: ["user1", "user2"], // 2 votes
          text: "Option One text",
        },
        optionTwo: {
          votes: ["user3", "user4", "user5"], // 3 votes
          text: "Option Two text",
        },
      },
    ],
    error: null,
    isLoading: false,
    selectedQuestion: {
      author: {
        id: "user1",
        password: "password", // dummy value
        name: "Test User",
        avatarURL: "http://example.com/avatar.png",
        answers: {},
        questions: [],
      },
      question: {
        id: "q1",
        author: "user1",
        timestamp: 1467166872634,
        optionOne: {
          votes: ["user1", "user2"],
          text: "Option One text",
        },
        optionTwo: {
          votes: ["user3", "user4", "user5"],
          text: "Option Two text",
        },
      },
    },
  },
} as const;

jest.mock("util", () => ({
  TextEncoder: class {},
  TextDecoder: class {},
}));

describe("QuestionPage Vote Percentages", () => {
  test("displays correct percentages for each option and dispatches actions", () => {
    jest.spyOn(redux, "useAppDispatch").mockImplementation(() => jest.fn());

    const { getByTestId } = renderWithProviders(
      <MemoryRouter initialEntries={["/questions/q1"]}>
        <Routes>
          <Route path="/questions/:questionId" element={<QuestionPage />} />
        </Routes>
      </MemoryRouter>,
      { preloadedState: preloadedState as any }
    );

    const optionOne = getByTestId("total-option-one");
    const optionTwo = getByTestId("total-option-two");

    expect(optionOne).toHaveTextContent("40");
    expect(optionTwo).toHaveTextContent("60");
  });
});
