import React from 'react';
import StakeForm from '../components/StakeForm';
import WithdrawForm from '../components/WithdrawForm';
import ClaimRewards from '../components/ClaimRewards';
import StakerInfo from '../components/StakerInfo';
import ContractInfo from '../components/ContractInfo';

function Dashboard() {
  return (
    <div className="Dashboard">
      <h1>Liquidity Mining Dashboard</h1>
      <ContractInfo />
      <StakerInfo />
      <StakeForm />
      <WithdrawForm />
      <ClaimRewards />
    </div>
  );
}

export default Dashboard;
