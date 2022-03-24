import React from 'react';
import Confetti from 'react-confetti';
import './App.css';
import Die from './components/die/die.component';

import { nanoid } from 'nanoid';

function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every(die => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true)
    }
  }, [dice])

  function generateNewDie() {
    let randNum = Math.floor(Math.random() * 6) + 1;
    return {
      value: randNum,
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    let diceNumbers = [];
    for (let i = 0; i < 10; i++) {
      diceNumbers.push(generateNewDie())
    }
    return diceNumbers;
  }


  function handleClick() {
    if (!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : generateNewDie()
      }));
    } else {
      setDice(allNewDice())
      setTenzies(false)
    }
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? { ...die, isHeld: !die.isHeld } : die
    }))
  }

  const dieElements = dice.map((die) => (<Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />))

  return (
    <div className="App">
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='die-container'>
        {dieElements}
      </div>
      <button className='roll-dice' onClick={handleClick}>{tenzies ? 'New Game' : 'Roll'}</button>
      {tenzies && <Confetti />}
    </div>
  );
}

export default App;
