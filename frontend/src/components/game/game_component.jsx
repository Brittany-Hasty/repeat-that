import React from 'react';

class Game extends React.Component {
    constructor(props){
        super(props);
        this.robotSequence = [];
        this.playerSequence = [];
        this.gameInProgress = false;
        this.previousHighScore = -1;
        this.scoreName = "";
        this.notice = "";
        this.state = {
            playerName: "Anonymous",
        };
        document.addEventListener("keydown", this.onKeyPressed.bind(this));
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.onKeyPressed.bind(this));
    } 

    onKeyPressed(e) {
        if(e.keyCode === 32){
            this.gameButtonClick("start");
        }
    }

    checkIfCorrect(){
        let idx = this.playerSequence.length - 1;
        if (this.robotSequence[idx] !== this.playerSequence[idx]){
            this.gameOver();
        } 
    }

    gameOver(){
        Object.values(document.getElementsByClassName("game-button"))
        .forEach((button) => {
            button.style.visibility = 'hidden';
        })
        this.gameInProgress = false;
        if (this.robotSequence.length - 1 > this.previousHighScore){
            this.previousHighScore = this.robotSequence.length - 1;
        }

        if (this.robotSequence.length - 1 > 0){
            const newScore = {
                score: this.robotSequence.length - 1,
                username: this.scoreName,
            }
            this.props.createScore(newScore).catch((err) => {
                console.log("Hello there programmer, if you're seeing this, I messed up somewhere sending the score to MongoDB. Feel free to call me out on it!")
            });
        }

        let builtMessage = "Your final score was " + (this.robotSequence.length - 1) + ". ";
        if (this.previousHighScore !== -1){
            builtMessage += "Your highest score so far is " + this.previousHighScore + ". ";
        }
        builtMessage += "Play again to beat your high score!";
        let gameOverDiv = document.getElementById("game-over");
        let scoreP = document.getElementById("score-text");
        scoreP.innerText = builtMessage;
        gameOverDiv.classList.remove("hidden");
        
        this.robotSequence = [];
        this.playerSequence = [];
    }

    handleInput(type) {
        this.transferNameIfValid();
        return (e) => {
            this.setState({ [type]: e.target.value });
        }
    }

    displaySequence(){
        // Hide and disable all buttons before showing the sequence
        Object.values(document.getElementsByClassName("game-button"))
        .forEach((button) => {
            button.style.visibility = 'hidden';
            button.disabled = true;
        })

        this.robotSequence.forEach((buttonInSeq, idx) => {
            // Variable indicator if button is repeated in the sequence
            let repeatSeq = false;
            if(idx < this.robotSequence.length-1 
                && buttonInSeq === this.robotSequence[idx+1]){
                    repeatSeq = true;
            }

            // Schedule this button to show up in one second
            setTimeout(()=>{
                document.getElementById(buttonInSeq).style.visibility='visible'
            }, (idx+1)*1000)

            // Schedule this button to disappear after two seconds
            // (Or slightly faster if it is a repeated button)
            setTimeout(()=>{
                document.getElementById(buttonInSeq).style.visibility='hidden'
            }, repeatSeq ? ((idx+2)*1000)-100 : (idx+2)*1000);
        })

        // Schedule the buttons to reappear after the sequence completes
        setTimeout(()=>{
            Object.values(document.getElementsByClassName("game-button"))
            .forEach((button) => {
                button.style.visibility = 'visible';
                button.disabled = false;
            })
        }, (this.robotSequence.length+1)*1000)
    }
        
    gameButtonClick(buttonPress){
        if (buttonPress !== "start" && this.gameInProgress){
            this.playerSequence.push(buttonPress);
            this.checkIfCorrect();
        } else {
            this.gameInProgress = true;
            let gameOverDiv = document.getElementById("game-over");
            gameOverDiv.classList.add("hidden");
        }

        if (this.gameInProgress &&
            this.robotSequence.length ===
            this.playerSequence.length){
                this.playerSequence = [];
                this.robotSequence.push(Math.floor(Math.random() * 4) + 1);
                this.displaySequence();
        }
    }

    transferNameIfValid(){
        let name = this.state.playerName;
        let forbidden = "/\\()[]`'|&!#$%^*?<>".split("");
        forbidden.push('"');
        let allowed = true;
        name.split("").forEach((char) => {
            if(forbidden.indexOf(char) !== -1){
                allowed = false;
            }
        })
        if(name.length > 0 && name.length < 50 && allowed){
            this.scoreName = name;
            this.notice = "Saved!";
        } else {
            if(!allowed){this.notice = "These characters are not allowed: " + forbidden};
            if(name.length === 0){this.notice = "At least one character. "}
            if(name.length > 50){this.notice = "Less than fifty characters. "}
        }
    }
    
    render() {
        return (
            <div className="gameBoard">
                <div className="jumbotron">
                    <h1>Repeat That Sequence!</h1>
                    <p>Repeat Simon's sequence and it will add another button for you to repeat. Get a high score, and you might just get on the leaderboard.</p>
                    <p>Press the spacebar or the start button to begin!</p>
                    <button className="start-button" onClick={() => this.gameButtonClick("start")}>
                        Start!
                    </button>
                </div>
                <p className="usernameInput">
                    Player Name: 
                    <input type="text" name="name" id="name" value={this.state.playerName} onChange={this.handleInput('playerName')} />
                    {this.notice}
                </p>
                <p>Scores will be sent at the end of each round, so be sure to change your name before the game ends!</p>
                <div id="game-over" className="alert alert-info hidden">
                    <strong>Game Over!</strong><p id="score-text"></p>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-6">
                            <button className="game-button green" id="1" onClick={() => this.gameButtonClick(1)} />
                        </div>
                        <div className="col-xs-6">
                            <button className="game-button yellow" id="2" onClick={() => this.gameButtonClick(2)} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-6">
                            <button className="game-button red" id="4" onClick={() => this.gameButtonClick(4)} />
                        </div>
                        <div className="col-xs-6">
                            <button className="game-button blue" id="3" onClick={() => this.gameButtonClick(3)} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Game;