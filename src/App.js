import React, {Component} from "react";
import "./App.css";
import Container from "./Components/Container";
import Navbar from "./Components/Navbar";
import Header from "./Components/Header";
import Cards from "./Components/Cards";
import Footer from "./Components/Footer";
import data from "./data.json"

class App extends Component {

state = {
    data,
    score: 0,
    topScore: 0
  };

componentDidMount() {
  this.setState({data: this.randomizeData(this.state.data)});
}

// fucntion to add score for correct click
handleCorrectClick = newData => {
  const { topScore, score} = this.state;
  const newScore = score + 1;
  const newTopScore= newScore > topScore ? newScore : topScore;
  this.setState({
    data: this.randomizeData(newData),
    score: newScore,
    topScore: newTopScore
  });
};

// function for incorrect click
handleIncorrectClick = data => {
  this.setState({
    data: this.resetData(data),
    score: 0
  });
};
// function for when image is clicked  - change individual state

// reset function for cards
resetData = data => {
    const resetData = data.map(item => ({ ...item, clicked: false}));
    return this.randomizeData(resetData);
  };
  
  // randomize cards each click / game 
  randomizeData = data => {
    let c = data.length - 1;
    while (c >0) {
      const d = Math.floor(Math.random() * (c +1));
      const temp = data[c];
      data[c]= data[d];
      data[d] = temp;
      c--;}
      return data;
  };

handleClickCard = id =>{
  let correctGuess = false;
  const newData = this.state.data.map(item => {
    const newItem = { ...item };
    if (newItem.id === id) {
      if (!newItem.clicked) {
        newItem.clicked = true;
        correctGuess = true;
      }
    }
    return newItem;
  });

  // Run click functions to determine correct/incorrect guesses

  correctGuess ? this.handleCorrectClick(newData) : this.handleIncorrectClick(newData);
};
    render() {
      return (
        <div>
          <Navbar score={this.state.score} topScore={this.state.topScore} />
        <Header />
          <Container>
            {this.state.data.map(item => (
              <Cards
                key={item.id}
                id={item.id}
                shake={!this.state.score && this.state.topScore}
                handleClick={this.handleClickCard}
                image={item.image}
              />
            ))}
          </Container>
          <Footer />
        </div>
      );
    }
  }

export default App;
