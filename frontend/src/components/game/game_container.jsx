import { connect } from 'react-redux';
import { createScore } from '../../actions/score_actions';
import Game from "./game_component";

const mDTP = dispatch => ({
    createScore: (score) => dispatch(createScore(score)),
});

export default connect(null, mDTP)(Game);

