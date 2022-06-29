export const ADD_NAME_EMAIL = 'ADD_NAME_EMAIL';
export const INCREMENT_SCORE = 'INCREMENT_SCORE';
export const RESET_SCORE = 'RESET_SCORE';

export const addNameEmail = (payload) => ({ type: ADD_NAME_EMAIL, payload });
export const incrementScore = (payload) => ({ type: INCREMENT_SCORE, payload });
export const resetScore = () => ({ type: RESET_SCORE });
