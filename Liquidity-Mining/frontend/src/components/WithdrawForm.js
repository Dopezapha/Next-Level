import React, { useState } from 'react';

function WithdrawForm() {
  const [amount, setAmount] = useState('');

  const handleWithdraw = (e) => {
    e.preventDefault();
    console.log('Withdrawing:', amount);
  };

  return (
    <form onSubmit={handleWithdraw}>
      <h2>Withdraw LP Tokens</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount to withdraw"
      />
      <button type="submit">Withdraw</button>
    </form>
  );
}

export default WithdrawForm;