import axios from 'axios';

export const createScore = (gameData) => {
    return axios({
        url: "/api/scores",
        method: "Post",
        data: gameData
    });
};

export const getScores = () => {
    return axios.get('/api/scores');
};