import React from 'react';
import { useContractCalls } from '../hooks/useContractCalls';

function ClaimRewards() {
  const { claimReward, loading } = useContractCalls();

  const handleClaim = async () => {
    try {
      await claimReward();
    } catch (error) {
      console.error('Claiming rewards failed:', error);
      alert('Claiming rewards failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Claim Rewards</h2>
      <button onClick={handleClaim} disabled={loading}>
        {loading ? 'Claiming...' : 'Claim Rewards'}
      </button>
    </div>
  );
}

export default ClaimRewards;
