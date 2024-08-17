import React, { createContext, useState, useEffect } from 'react';
import { useWeb3 } from '../hooks/useWeb3';

export const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const { web3, account, contract } = useWeb3();
  const [btcStake, setBtcStake] = useState(null);
  const [liquidity, setLiquidity] = useState(null);
  const [leveragedPosition, setLeveragedPosition] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (contract && account) {
      fetchAccountInfo();
    }
  }, [contract, account]);

  const fetchAccountInfo = async () => {
    try {
      const stake = await contract.methods.getBtcStake(account).call();
      const liq = await contract.methods.getLiquidity(account).call();
      const position = await contract.methods.getLeveragedPosition(account).call();

      setBtcStake(web3.utils.fromWei(stake, 'ether'));
      setLiquidity({
        btc: web3.utils.fromWei(liq.btc, 'ether'),
        usd: web3.utils.fromWei(liq.usd, 'ether')
      });
      setLeveragedPosition(position ? {
        btcAmount: web3.utils.fromWei(position.btcAmount, 'ether'),
        leverage: position.leverage
      } : null);
    } catch (error) {
      console.error('Error fetching account info:', error);
    }
  };

  const stakeBtc = async (amount) => {
    setIsLoading(true);
    try {
      const weiAmount = web3.utils.toWei(amount, 'ether');
      await contract.methods.stakeBtc(weiAmount).send({ from: account });
      await fetchAccountInfo();
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const unstakeBtc = async (amount) => {
    setIsLoading(true);
    try {
      const weiAmount = web3.utils.toWei(amount, 'ether');
      await contract.methods.unstakeBtc(weiAmount).send({ from: account });
      await fetchAccountInfo();
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const addLiquidity = async (btcAmount, usdAmount) => {
    setIsLoading(true);
    try {
      const weiBtc = web3.utils.toWei(btcAmount, 'ether');
      const weiUsd = web3.utils.toWei(usdAmount, 'ether');
      await contract.methods.addLiquidityBtc(weiBtc, weiUsd).send({ from: account });
      await fetchAccountInfo();
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const removeLiquidity = async (btcAmount, usdAmount) => {
    setIsLoading(true);
    try {
      const weiBtc = web3.utils.toWei(btcAmount, 'ether');
      const weiUsd = web3.utils.toWei(usdAmount, 'ether');
      await contract.methods.removeLiquidityBtc(weiBtc, weiUsd).send({ from: account });
      await fetchAccountInfo();
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const openLeveragedPosition = async (btcAmount, leverage) => {
    setIsLoading(true);
    try {
      const weiBtc = web3.utils.toWei(btcAmount, 'ether');
      await contract.methods.openLeveragedPosition(weiBtc, leverage).send({ from: account });
      await fetchAccountInfo();
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const closeLeveragedPosition = async () => {
    setIsLoading(true);
    try {
      await contract.methods.closeLeveragedPosition().send({ from: account });
      await fetchAccountInfo();
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
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
