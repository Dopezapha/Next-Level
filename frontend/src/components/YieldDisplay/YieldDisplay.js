import React, { useContext } from 'react';
import { Web3Context } from '../../contexts/Web3Context';
import styles from './YieldDisplay.module.css';

function YieldDisplay() {
  const { currentYield } = useContext(Web3Context);

  return (
    <div className={styles.yieldDisplay}>
      <h2>Current Yield</h2>
      <p>{currentYield !== null ? `${currentYield}% APY` : 'Loading...'}</p>
    </div>
  );
}

export default YieldDisplay;
