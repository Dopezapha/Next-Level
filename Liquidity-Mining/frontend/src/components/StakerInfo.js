import React from 'react';
import { useContractCalls } from '../hooks/useContractCalls';

function StakerInfo() {
  const { stakerInfo, loading } = useContractCalls();

  if (loading) {
    return <div>Loading staker info...</div>;
  }

  return (
    <div>
      <h2>Your Staking Info</h2>
      <p>Balance: {stakerInfo.balance}</p>
      <p>Reward Debt: {stakerInfo.rewardDebt}</p>
    </div>
  );
}

export default StakerInfo;
