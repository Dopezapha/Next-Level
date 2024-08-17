import React, { useState } from 'react';
import { useContractCalls } from '../hooks/useContractCalls';
import { useUser } from '../contexts/UserContext';

// IMPLEMENTED: User authentication check and improved error handling
function StakeForm() {
  const [amount, setAmount] = useState('');
  const { stake, loading } = useContractCalls();
  const { userData, signin } = useUser();

  const handleStake = async (e) => {
    e.preventDefault();
    if (!userData) {
      alert('Please sign in to stake');
      signin();
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert('Please enter a valid positive amount');
      return;
    }
    try {
      await stake(Number(amount));
      setAmount('');
      alert('Staking successful!');
    } catch (error) {
      console.error('Staking failed:', error);
      alert('Staking failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleStake}>
      <h2>Stake LP Tokens</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount to stake"
        min="0"
        step="1"
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Staking...' : 'Stake'}
      </button>
    </form>
  );
}

export default StakeForm;
