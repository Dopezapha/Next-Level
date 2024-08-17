import React, { createContext, useState, useEffect } from 'react';
import { useWeb3 } from '../hooks/useWeb3';

export const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const { web3, account, contract } = useWeb3();
  const [stakedAmount, setStakedAmount] = useState(null);
  const [currentYield, setCurrentYield] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (contract && account) {
      fetchStakedAmount();
      fetchCurrentYield();
    }
  }, [contract, account]);

  const fetchStakedAmount = async () => {
    try {
      const amount = await contract.methods.stakedBalance(account).call();
      setStakedAmount(web3.utils.fromWei(amount, 'ether'));
    } catch (error) {
      console.error('Error fetching staked amount:', error);
    }
  };

  const fetchCurrentYield = async () => {
    try {
      const yield = await contract.methods.currentYield().call();
      setCurrentYield(web3.utils.fromWei(yield, 'ether'));
    } catch (error) {
      console.error('Error fetching current yield:', error);
    }
  };

  const stakeTokens = async (amount) => {
    setIsLoading(true);
    try {
      const weiAmount = web3.utils.toWei(amount, 'ether');
      await contract.methods.stake().send({ from: account, value: weiAmount });
      await fetchStakedAmount();
      await fetchCurrentYield();
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Web3Context.Provider value={{ account, stakedAmount, currentYield, stakeTokens, isLoading }}>
      {children}
    </Web3Context.Provider>
  );
};
