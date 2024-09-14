import React from 'react';
import StakeForm from '../components/StakeForm';
import WithdrawForm from '../components/WithdrawForm';
import ClaimRewards from '../components/ClaimRewards';
import StakerInfo from '../components/StakerInfo';
import ContractInfo from '../components/ContractInfo';
import { useUser } from '../contexts/UserContext';

// IMPLEMENTED: User authentication UI
function Dashboard() {
  const { userData, signin, signout } = useUser();

  return (
    <div className="Dashboard">
      <h1>Liquidity Mining Dashboard</h1>
      {userData ? (
        <>
          <button onClick={signout}>Sign Out</button>
          <ContractInfo />
          <StakerInfo />
          <StakeForm />
          <WithdrawForm />
          <ClaimRewards />
        </>
      ) : (
        <button onClick={signin}>Sign In with Stacks</button>
      )}
    </div>
  );
}

export default Dashboard;
