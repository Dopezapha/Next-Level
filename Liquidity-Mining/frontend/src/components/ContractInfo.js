import React from 'react';

function ContractInfo() {
  const contractInfo = {
    rewardRate: 100,
    totalSupply: 10000
  };

  return (
    <div>
      <h2>Contract Info</h2>
      <p>Reward Rate: {contractInfo.rewardRate}</p>
      <p>Total Supply: {contractInfo.totalSupply}</p>
    </div>
  );
}

export default ContractInfo;