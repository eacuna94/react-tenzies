import React from 'react';
import './die.styles.css';

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? '#59E391' : 'white'
  }

  return (
    <div className='die-card' style={styles} onClick={props.holdDice}>
      <span className='die-number'>{props.value}</span>
    </div>
  )
}
