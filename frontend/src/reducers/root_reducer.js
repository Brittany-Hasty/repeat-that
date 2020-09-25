import { combineReducers } from 'redux';
import scoresReducer from "./scores_reducer";

const RootReducer = combineReducers({
    scores: scoresReducer,
});

export default RootReducer;