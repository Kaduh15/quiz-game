import { ADD_NAME_EMAIL, CHOSEDIFFICULTY,
  INCREMENT_SCORE, RESET_SCORE } from '../Actions';

const initialState = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  filtros: { difficulty: 'todos', tipo: 5, categoria: 'todos' },
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
      score: state.score + action.payload.score,
      assertions: action.payload.assertions ? state.assertions + 1 : state.assertions };
  case RESET_SCORE:
    return {
      ...state,
      score: 0,
      assertions: 0,
    };
  case CHOSEDIFFICULTY:
    return {
      ...state,
      filtros: { difficulty: action.payload.dificuldade,
        tipo: action.payload.tipo,
        categoria: action.payload.categoria },
    };
  default:
    return state;
  }
};

export default playerReducer;
