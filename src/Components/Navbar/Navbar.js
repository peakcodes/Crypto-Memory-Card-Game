import React from "react";
import GameMessage from "../GameMessage";

const Navbar = props => (
    <nav className="navbar">
        <ul>
            <li className="brand">
                <a href="./">Crypto Memory Game</a>
            </li>
            {/* input gamemessage alerts into navbar */}
            <GameMessage score={props.score} topScore={props.topScore} />
            <li>
                Score: {props.score} || Top Score: {props.topScore}
            </li>
        </ul>
    </nav>
)

export default Navbar;