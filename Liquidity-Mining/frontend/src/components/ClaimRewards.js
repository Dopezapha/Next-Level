import React from 'react';

function ClaimRewards() {
  const handleClaim = () => {
    console.log('Claiming rewards');
  };

  return (
    <div>
      <h2>Claim Rewards</h2>
      <button onClick={handleClaim}>Claim Rewards</button>
    </div>
  );
}

export default ClaimRewards;