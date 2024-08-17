import React, { useState, useContext } from 'react';
import { Web3Context } from '../../contexts/Web3Context';
import styles from './StakingForm.module.css';

function StakingForm() {
  const [amount, setAmount] = useState('');
  const { stakeTokens, isLoading } = useContext(Web3Context);

  const handleStake = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    try {
      await stakeTokens(amount);
      setAmount('');
    } catch (error) {
      console.error('Staking error:', error);
      alert('An error occurred while staking. Please try again.');
    }
  };

  return (
    <div className={styles.stakingForm}>
      <h2>Stake Your Bitcoin</h2>
      <form onSubmit={handleStake}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount in BTC"
          step="0.00000001"
          min="0"
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Staking...' : 'Stake'}
        </button>
      </form>
    </div>
  );
}

export default StakingForm;
