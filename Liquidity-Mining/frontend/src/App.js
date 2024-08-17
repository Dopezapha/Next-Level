import React, { useState, useEffect } from 'react';
import { Connect } from '@stacks/connect-react';
import { userSession } from './auth';
import StakingForm from './components/StakerInfo';
import WithdrawForm from './components/WithdrawForm';
import ClaimRewards from './components/ClaimRewards';
import StakingInfo from './components/StakeForm';
import './App.css';

function App() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then(() => {
        setUserData(userSession.loadUserData());
      });
    } else if (userSession.isUserSignedIn()) {
      setUserData(userSession.loadUserData());
    }
  }, []);

  return (
    <Connect
      authOptions={{
        appDetails: {
          name: 'Staking dApp',
          icon: window.location.origin + '/logo.png',
        },
        redirectTo: '/',
        onFinish: () => {
          setUserData(userSession.loadUserData());
        },
        userSession,
      }}
    >
      <div className="App">
        <h1>Staking dApp</h1>
        {userData ? (
          <>
            <p>Connected: {userData.profile.stxAddress.mainnet}</p>
            <StakingForm />
            <WithdrawForm />
            <ClaimRewards />
            <StakingInfo />
          </>
        ) : (
          <button onClick={() => userSession.redirectToSignIn()}>Connect Wallet</button>
        )}
      </div>
    </Connect>
  );
}

export default App;
