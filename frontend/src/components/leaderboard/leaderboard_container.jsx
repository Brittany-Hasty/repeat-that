import { connect } from "react-redux";
import { getScores } from "../../actions/score_actions";
import Leaderboard from "./leaderboard_component";

const mSTP = state => ({
    scores: state.scores
});

const mDTP = (dispatch) => ({
    getScores: () => dispatch(getScores())
});

export default connect(mSTP, mDTP)(Leaderboard);
