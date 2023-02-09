import { combineReducers } from 'redux';

const INITIAL_STATE = {
  name: '', // nome da pessoa
  assertions: 0, // numero de acertos
  score: 0, // pontuação
  gravatarEmail: '', // e-mail da pessoa

};

const exampleReducer = (state = INITIAL_STATE, { type /* , payload */ }) => {
  switch (type) {
  // case TOKEN_PLAYER:
  //   return {

  // };
  default:
    return state;
  }
};

const rootReducer = combineReducers({ exampleReducer });

export default rootReducer;
