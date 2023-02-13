import { combineReducers } from 'redux';
import {
  CORRECT_ANSWER,
  INCORRECT_ANSWER,
  RESET_GAME,
  SAVE_EMAIL,
  SHUFFLE_QUESTIONS,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  name: '', // nome da pessoa
  assertions: 0, // numero de acertos
  score: 0, // pontuação
  gravatarEmail: '', // e-mail da pessoa
  questions: [],
};

const player = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case SAVE_EMAIL:
    return {
      ...state,
      name: payload[0],
      gravatarEmail: payload[1],
    };
  case SHUFFLE_QUESTIONS:
    return {
      ...state,
      questions: payload,
    };
  case CORRECT_ANSWER:
    return {
      ...state,
      score: state.score + payload,
      assertions: state.assertions + 1,
    };
  case INCORRECT_ANSWER:
    return {
      ...state,
    };
  case RESET_GAME:
    return {
      name: '', // nome da pessoa
      assertions: 0, // numero de acertos
      score: 0, // pontuação
      gravatarEmail: '', // e-mail da pessoa
      questions: [],
    };
  default:
    return state;
  }
};

const rootReducer = combineReducers({ player });

export default rootReducer;
