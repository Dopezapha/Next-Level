import React, { useState } from 'react';
import { useContractCalls } from '../hooks/useContractCalls';

function WithdrawForm() {
  const [amount, setAmount] = useState('');
  const { withdraw, loading } = useContractCalls();

  const handleWithdraw = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount)) {
      alert('Please enter a valid amount');
      return;
    }
    try {
      await withdraw(Number(amount));
      setAmount('');
    } catch (error) {
      console.error('Withdrawal failed:', error);
      alert('Withdrawal failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleWithdraw}>
      <h2>Withdraw LP Tokens</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount to withdraw"
        min="0"
        step="1"
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Withdrawing...' : 'Withdraw'}
      </button>
    </form>
  );
}

export default WithdrawForm;
