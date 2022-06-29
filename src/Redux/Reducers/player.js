import { ADD_NAME_EMAIL, INCREMENT_SCORE, RESET_SCORE } from '../Actions';

const initialState = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
  case ADD_NAME_EMAIL:
    return {
      ...state,
      gravatarEmail: action.payload.email,
      name: action.payload.name,
    };
  case INCREMENT_SCORE:
    return { ...state,
      score: action.payload ? state.score + 1 : state.score,
      assertions: action.payload ? state.assertions + 1 : state.assertions };
  case RESET_SCORE:
    return {
      ...state,
      score: 0,
      assertions: 0,
    };
  default:
    return state;
  }
};

export default playerReducer;
