import React, { useState, useContext } from 'react';
import { Web3Context } from '../../contexts/Web3Context';
import styles from './StakingForm.module.css';

function StakingForm() {
  const [amount, setAmount] = useState('');
  const { stakeBtc, unstakeBtc, isLoading } = useContext(Web3Context);

  const handleStake = async (e) => {
    e.preventDefault();
    if (!validateAmount(amount)) return;
    try {
      await stakeBtc(amount);
      setAmount('');
    } catch (error) {
      handleError('Staking error', error);
    }
  };

  const handleUnstake = async (e) => {
    e.preventDefault();
    if (!validateAmount(amount)) return;
    try {
      await unstakeBtc(amount);
      setAmount('');
    } catch (error) {
      handleError('Unstaking error', error);
    }
  };

  // CHANGE: Added validation function
  const validateAmount = (value) => {
    if (!value || isNaN(value) || parseFloat(value) <= 0) {
      alert('Please enter a valid positive amount');
      return false;
    }
    return true;
  };

  // CHANGE: Added error handling function
  const handleError = (message, error) => {
    console.error(`${message}:`, error);
    alert(`An error occurred: ${error.message || 'Unknown error'}`);
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
