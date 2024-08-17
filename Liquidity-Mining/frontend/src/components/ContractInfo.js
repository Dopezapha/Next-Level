import React from 'react';
import { useContractCalls } from '../hooks/useContractCalls';

function ContractInfo() {
  const { contractInfo, loading } = useContractCalls();

  if (loading) {
    return <div>Loading contract info...</div>;
  }

  return (
    <div>
      <h2>Contract Info</h2>
      <p>Reward Rate: {contractInfo.rewardRate}</p>
      <p>Total Supply: {contractInfo.totalSupply}</p>
    </div>
  );
}

export default ContractInfo;
