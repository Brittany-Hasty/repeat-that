import * as APIUtil from "../util/score_api_util";
export const RECEIVE_SCORES = "RECEIVE_SCORES";
export const RECEIVE_SCORE_ERRORS = "RECEIVE_SCORE_ERRORS";
export const REMOVE_GAME_ERRORS = "REMOVE_GAME_ERRORS";

const receiveScores = (scores) => ({
    type: RECEIVE_SCORES,
    scores
});

export const receiveErrors = errors => ({
    type: RECEIVE_SCORE_ERRORS,
    errors
});

export const removeErrors = () => ({
    type: REMOVE_GAME_ERRORS
});

export const createScore = (score) => dispatch =>(
    APIUtil.createScore(score) 
        .catch(err => {
            return dispatch(receiveErrors(err.response.data));
        })
);

export const getScores = () => (dispatch) =>(
    APIUtil.getScores()
        .then((res) => {
            const scores = res.data;
            dispatch(receiveScores(scores));
        })
        .catch((err) => {
            return dispatch(receiveErrors(err.response.data));
        })
);