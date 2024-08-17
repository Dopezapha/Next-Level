import React, { useState } from 'react';
import { useContractCalls } from '../hooks/useContractCalls';

function StakeForm() {
  const [amount, setAmount] = useState('');
  const { stake, loading } = useContractCalls();

  const handleStake = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount)) {
      alert('Please enter a valid amount');
      return;
    }
    try {
      await stake(Number(amount));
      setAmount('');
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