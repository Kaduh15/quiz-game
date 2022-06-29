export const ADD_NAME_EMAIL = 'ADD_NAME_EMAIL';
export const INCREMENT_SCORE = 'INCREMENT_SCORE';

export const addNameEmail = (payload) => ({ type: ADD_NAME_EMAIL, payload });
export const incrementScore = (payload) => ({ type: INCREMENT_SCORE, payload });

// export const TOKEN = 'ACTIONTOKEN';

// export const actionToken = (req) => ({ type: TOKEN, payload: req });

// export const actionThunkToken = () => (dispatch) => {
//   const url = 'https://opentdb.com/api_token.php?command=request';
//   const
// };
