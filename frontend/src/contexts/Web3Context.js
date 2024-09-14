import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useWeb3 } from '../hooks/useWeb3';

export const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const { web3, account, contract } = useWeb3();
  const [btcStake, setBtcStake] = useState(null);
  const [liquidity, setLiquidity] = useState(null);
  const [leveragedPosition, setLeveragedPosition] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAccountInfo = useCallback(async () => {
    if (!contract || !account) return;

    try {
      const stake = await contract.methods.getBtcStake(account).call();
      const liq = await contract.methods.getLiquidity(account).call();
      const position = await contract.methods.getLeveragedPosition(account).call();

      setBtcStake(web3.utils.fromWei(stake, 'ether'));
      setLiquidity({
        btc: web3.utils.fromWei(liq.btc, 'ether'),
        usd: web3.utils.fromWei(liq.usd, 'ether')
      });
      setLeveragedPosition(position.btcAmount !== '0' ? {
        btcAmount: web3.utils.fromWei(position.btcAmount, 'ether'),
        leverage: position.leverage
      } : null);
    } catch (error) {
      console.error('Error fetching account info:', error);
    }
  }, [contract, account, web3]);

  useEffect(() => {
    fetchAccountInfo();
  }, [fetchAccountInfo]);

  const executeContractMethod = async (method, ...args) => {
    setIsLoading(true);
    try {
      await method(...args).send({ from: account });
      await fetchAccountInfo();
    } catch (error) {
      console.error('Contract method execution error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const stakeBtc = async (amount) => {
    const weiAmount = web3.utils.toWei(amount, 'ether');
    await executeContractMethod(contract.methods.stakeBtc, weiAmount);
  };

  const unstakeBtc = async (amount) => {
    const weiAmount = web3.utils.toWei(amount, 'ether');
    await executeContractMethod(contract.methods.unstakeBtc, weiAmount);
  };

  const addLiquidity = async (btcAmount, usdAmount) => {
    const weiBtc = web3.utils.toWei(btcAmount, 'ether');
    const weiUsd = web3.utils.toWei(usdAmount, 'ether');
    await executeContractMethod(contract.methods.addLiquidityBtc, weiBtc, weiUsd);
  };

  const removeLiquidity = async (btcAmount, usdAmount) => {
    const weiBtc = web3.utils.toWei(btcAmount, 'ether');
    const weiUsd = web3.utils.toWei(usdAmount, 'ether');
    await executeContractMethod(contract.methods.removeLiquidityBtc, weiBtc, weiUsd);
  };

  const openLeveragedPosition = async (btcAmount, leverage) => {
    const weiBtc = web3.utils.toWei(btcAmount, 'ether');
    await executeContractMethod(contract.methods.openLeveragedPosition, weiBtc, leverage);
  };

  const closeLeveragedPosition = async () => {
    await executeContractMethod(contract.methods.closeLeveragedPosition);
  };

  return (
    <Web3Context.Provider value={{
      account,
      btcStake,
      liquidity,
      leveragedPosition,
      isLoading,
      stakeBtc,
      unstakeBtc,
      addLiquidity,
      removeLiquidity,
      openLeveragedPosition,
      closeLeveragedPosition
    }}>
      {children}
    </Web3Context.Provider>
  );
};
