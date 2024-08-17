import React from 'react';
import { Connect } from '@stacks/connect-react';
import { UserContextProvider } from './contexts/UserContext';
import Dashboard from './containers/Dashboard';

// IMPLEMENTED: Stacks authentication setup
function App() {
  const appConfig = {
    appName: 'Liquidity Mining Dashboard',
    appIconUrl: '/logo512.png',
    network: 'mainnet', // or 'testnet'
  };

  return (
    <Connect authOptions={appConfig}>
      <UserContextProvider>
        <div className="App">
          <Dashboard />
        </div>
      </UserContextProvider>
    </Connect>
  );
}

export default App;
