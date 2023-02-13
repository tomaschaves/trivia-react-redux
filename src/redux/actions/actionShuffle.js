import { SHUFFLE_QUESTIONS } from './actionTypes';

export const actionShuffle = (payload) => ({
  type: SHUFFLE_QUESTIONS,
  payload,
});
