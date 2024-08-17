import React, { useState, useContext } from 'react';
import { Web3Context } from '../../contexts/Web3Context';
import styles from './StakingForm.module.css';

function StakingForm() {
  const [amount, setAmount] = useState('');
  const { stakeBtc, unstakeBtc, isLoading } = useContext(Web3Context);

  const handleStake = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    try {
      await stakeBtc(amount);
      setAmount('');
    } catch (error) {
      console.error('Staking error:', error);
      alert('An error occurred while staking. Please try again.');
    }
  };

  const handleUnstake = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    try {
      await unstakeBtc(amount);
      setAmount('');
    } catch (error) {
      console.error('Unstaking error:', error);
      alert('An error occurred while unstaking. Please try again.');
    }
  };

  return (
    <div className={styles.stakingForm}>
      <h2>Stake or Unstake BTC</h2>
      <form>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount in BTC"
          step="0.00000001"
          min="0"
          disabled={isLoading}
        />
        <button onClick={handleStake} disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Stake'}
        </button>
        <button onClick={handleUnstake} disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Unstake'}
        </button>
      </form>
    </div>
  );
}

export default StakingForm;
