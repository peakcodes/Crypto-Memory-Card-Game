import React, { Component } from "react";
import "./GameMessage.css";


// method determines message provide to user during game play 
class GameMessage extends Component {
    // determine original state//
    state = {
        message: "",
        inplay: false
    };

    // set method to determine game message
    // score is active data component
    componentWillReceiveProps({ score, topScore }) {
        const newState = { inplay: true };
            if (score === 0 && topScore === 0) {
                newState.message = '';
            }
            else if (score === 0 && topScore > 0) {
                newState.message = 'incorrect';
            }
            else if (score === topScore) {
                newState.message = "highscore"
            }
            else {
                newState.message = "correct";
            }
            // set time out for message to appear and cards to shuffle
            this.setState(newState, () =>
                setTimeout(() => this.setState({ inplay: false }), 500)
            );
        }

    // create switch function to change between messages

    renderMessage = () => {
        switch (this.state.message) {
            default:
                return "Click an image to start!"
            case "incorrect":
                return "Incorrect! Please play again.";
            case "correct":
                return "Correct! Guess again and continue your streak."
            case "highscore":
                return "Game over! New High Score!";
        }
    };
    // render messages to navbar

    render() {
        return (
            <li className={this.state.inplay ? this.state.message : ""}>
                {this.renderMessage()}
            </li>
        );
    }
}

export default GameMessage;