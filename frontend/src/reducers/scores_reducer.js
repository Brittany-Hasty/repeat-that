import { RECEIVE_SCORES } from "../actions/score_actions";

const scoresReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_SCORES:
      newState = action.scores;
      return newState;
    default:
      return state;
  }
};

export default scoresReducer;
