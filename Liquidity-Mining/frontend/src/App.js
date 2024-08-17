import React from 'react';
import StakeForm from './StakeForm';
import WithdrawForm from './WithdrawForm';
import ClaimRewards from './ClaimRewards';
import StakerInfo from './StakerInfo';
import ContractInfo from './ContractInfo';

function App() {
  return (
    <div className="App">
      <h1>Liquidity Mining Dashboard</h1>
      <ContractInfo />
      <StakerInfo />
      <StakeForm />
      <WithdrawForm />
      <ClaimRewards />
    </div>
  );
}

export default App;