import { CORRECT_ANSWER, INCORRECT_ANSWER } from './actionTypes';

export const correctAnswer = (payload) => ({
  type: CORRECT_ANSWER,
  payload,
});

export const incorrectAnswer = () => ({
  type: INCORRECT_ANSWER,
});
