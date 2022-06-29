import { ADD_NAME_EMAIL, INCREMENT_SCORE } from '../Actions';

const initialState = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
  case ADD_NAME_EMAIL:
    return {
      ...state,
      gravatarEmail: action.payload.email,
      name: action.payload.name,
    };
  case INCREMENT_SCORE:
    return { ...state, score: action.payload ? state.score + 1 : state.score };
  default:
    return state;
  }
};

export default loginReducer;
