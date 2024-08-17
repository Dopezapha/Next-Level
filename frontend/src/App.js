import React from 'react';
import { Web3Provider } from './contexts/Web3Context';
import AccountInfo from './components/AccountInfo/AccountInfo';
import StakingForm from './components/StakingForm/StakingForm';
import LiquidityForm from './components/LiquidityForm/LiquidityForm';
import LeverageForm from './components/LeverageForm/LeverageForm';
import styles from './App.module.css';

function App() {
  return (
    <Web3Provider>
      <div className={styles.app}>
        <h1>Bitcoin Staking and Yield Optimization</h1>
        <div className={styles.grid}>
          {/* CHANGE: Wrapped components in a grid for better layout */}
          <AccountInfo />
          <StakingForm />
          <LiquidityForm />
          <LeverageForm />
        </div>
      </div>
    </Web3Provider>
  );
}

export default App;
