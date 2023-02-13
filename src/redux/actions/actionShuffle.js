import { CORRECT_ANSWER, INCORRECT_ANSWER, SHUFFLE_QUESTIONS } from './actionTypes';

export const actionShuffle = (payload) => ({
  type: SHUFFLE_QUESTIONS,
  payload,
});

export const correctAnswer = (payload) => ({
  type: CORRECT_ANSWER,
  payload,
});

export const incorrectAnswer = () => ({
  type: INCORRECT_ANSWER,
});
