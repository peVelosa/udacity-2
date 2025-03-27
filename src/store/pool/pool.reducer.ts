import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { Question, User } from "@/@types";
import { PoolState } from "./pool.types";
import { _getQuestions } from "@/server/_DATA";
import { fetchUserById } from "../auth/auth.reducer";

export const fetchQuestions = createAsyncThunk(
  "pool/fetchQuestions",
  async (): Promise<Question[]> =>
    Object.values(await _getQuestions()) as Question[]
);

export const fetchQuestionById = createAsyncThunk(
  "pool/fetchQuestionById",
  async (
    id: string
  ): Promise<{
    question: Question;
    author: Required<User>;
  } | null> => {
    const questions = await _getQuestions();
    const question = (Object.values(questions) as Question[]).find(
      (question) => question.id === id
    ) as Question | null;

    if (!question) return null;

    const author = await fetchUserById(question?.author);

    if (!author) return null;

    return {
      question,
      author,
    };
  }
);

const initialState: PoolState = {
  questions: [],
  error: null,
  isLoading: false,
  selectedQuestion: null,
};

export const poolSlice = createSlice({
  name: "pool",
  initialState,
  reducers: {
    addQuestion(state, action: PayloadAction<Question>) {
      state.questions = [...state.questions, action.payload];
    },
    unselectQuestion(state) {
      state.selectedQuestion = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchQuestions.fulfilled,
      (state, action: PayloadAction<Question[]>) => {
        state.questions = action.payload;
        state.isLoading = false;
      }
    );
    builder.addCase(fetchQuestions.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchQuestions.rejected, (state) => {
      state.isLoading = false;
      state.error = "Failed to fetch questions";
    });
    builder.addCase(fetchQuestionById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchQuestionById.fulfilled,
      (
        state,
        action: PayloadAction<{
          question: Question;
          author: Required<User>;
        } | null>
      ) => {
        state.selectedQuestion = action.payload;
        state.isLoading = false;
      }
    );
  },
});

export const { addQuestion, unselectQuestion } = poolSlice.actions;
