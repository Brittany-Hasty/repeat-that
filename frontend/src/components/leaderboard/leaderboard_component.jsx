import React from "react";

class Leaderboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scores: []
        }

        this.props.getScores().then(() => {
            this.setState({scores: this.props.scores});
        })
    }

    makeDatePretty(date){
        const monthname = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const d = new Date(date);
        const formatted = monthname[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
        return formatted;
    }

    render() {
        return (
            <div id="leaderboard">
                <div className="jumbotron">
                    <h1>Leaderboard</h1>
                </div>
                <div className="container">
                    <div className="row dataDesc">
                        <div className="col-xs-4">
                            <h3>Score</h3>
                        </div>
                        <div className="col-xs-4">
                            <h3>User</h3>
                        </div>
                        <div className="col-xs-4">
                            <h3>Date</h3>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <ol>
                        {this.state.scores.map((s, i) => {
                            return (
                                <li key={i} className="row">
                                    <div className="col-xs-4">
                                        <h3>{s.score + " points"}</h3>
                                    </div>
                                    <div className="col-xs-4">
                                        <h3>{s.username}</h3>
                                    </div>
                                    <div className="col-xs-4">
                                        <h3>{this.makeDatePretty(Date.parse(s.date))}</h3>
                                    </div>
                                </li>
                            )
                        })}
                    </ol>
                </div>
            </div>
        );
    }
}

export default Leaderboard;
