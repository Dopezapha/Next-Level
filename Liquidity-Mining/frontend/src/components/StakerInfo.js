import React from 'react';

function StakerInfo() {
  const stakerInfo = {
    balance: 1000,
    rewardDebt: 50
  };

  return (
    <div>
      <h2>Your Staking Info</h2>
      <p>Balance: {stakerInfo.balance}</p>
      <p>Reward Debt: {stakerInfo.rewardDebt}</p>
    </div>
  );
}

export default StakerInfo;