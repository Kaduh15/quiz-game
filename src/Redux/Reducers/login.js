import { ADD_NAME_EMAIL } from '../Actions';

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
  default:
    return state;
  }
};

export default loginReducer;
