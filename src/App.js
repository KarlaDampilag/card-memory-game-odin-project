import React from 'react';
import './App.css';
import Board from './components/Board/Board';
import Scoreboard from './components/Scoreboard/Scoreboard';
import { shuffleArray } from './utils';

function App() {
  const [cardsData, setCardsData] = React.useState([]);
  const [clickedCardIds, setClickedCardIds] = React.useState([]);
  const [currentScore, setCurrentScore] = React.useState(0);
  const [bestScore, setBestScore] = React.useState(0);

  async function fetchData() {
    fetch(`https://rickandmortyapi.com/api/character?page=${Math.floor(Math.random() * 41)}`)
      .then((response) => response.json())
      .then((data) => {
        const shuffledArray = shuffleArray(data.results);
        setCardsData(shuffledArray);
      });
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  function onCardClick(cardId) {
    if (clickedCardIds.includes(cardId)) {
      setCurrentScore(0);
      setClickedCardIds([]);
    } else {
      setCurrentScore(currentScore + 1);
      
      if (currentScore + 1 > bestScore) {
        setBestScore(currentScore + 1);
      }

      setClickedCardIds([...clickedCardIds, cardId]);
    }

    const shuffledArray = shuffleArray(cardsData);
    setCardsData(shuffledArray);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Rick and Morty Card Memory Game</h1>
      </header>
      <div className="App-body">
        <p>Get as many points as possible by clicking on a card only once!</p>
        <Scoreboard currentScore={currentScore} bestScore={bestScore} />
        <Board data={cardsData} onCardClick={onCardClick} />
      </div>
      <footer>
        <a href="https://fullstackvault.xyz">Learn how to code for free</a>
      </footer>
    </div>
  );
}

export default App;
