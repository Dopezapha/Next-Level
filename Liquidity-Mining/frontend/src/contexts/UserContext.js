import React, { createContext, useState, useContext } from 'react';
import { useConnect } from '@stacks/connect-react';

// IMPLEMENTED: Context for state management
const UserContext = createContext();

export function UserContextProvider({ children }) {
  const { authOptions } = useConnect();
  const [userData, setUserData] = useState(null);

  const signin = async () => {
    if (authOptions.appDetails) {
      const { authOptions } = useConnect();
      authOptions.userSession.requestSignIn({
        onFinish: () => {
          setUserData(authOptions.userSession.loadUserData());
        },
      });
    }
  };

  const signout = async () => {
    authOptions.userSession.signUserOut();
    setUserData(null);
  };

  return (
    <UserContext.Provider value={{ userData, signin, signout }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
