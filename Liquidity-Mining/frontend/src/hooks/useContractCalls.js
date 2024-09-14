import { useState, useEffect } from 'react';
import { useConnect } from '@stacks/connect-react';
import { callReadOnlyFunction, contractPrincipalCV, uintCV } from '@stacks/transactions';
import { StacksMainnet, StacksTestnet } from '@stacks/network';
import { CONTRACT_ADDRESS, CONTRACT_NAME } from '../utils/constants';
import { useUser } from '../contexts/UserContext';

// IMPLEMENTED: Contract calls and error handling
export function useContractCalls() {
  const { userData } = useUser();
  const { doContractCall } = useConnect();
  const [loading, setLoading] = useState(false);
  const [stakerInfo, setStakerInfo] = useState({ balance: 0, rewardDebt: 0 });
  const [contractInfo, setContractInfo] = useState({ rewardRate: 0, totalSupply: 0 });

  const network = new StacksMainnet(); // or StacksTestnet()

  useEffect(() => {
    if (userData) {
      fetchStakerInfo();
      fetchContractInfo();
    }
  }, [userData]);

  async function fetchStakerInfo() {
    try {
      const result = await callReadOnlyFunction({
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: 'get-staker-info',
        functionArgs: [contractPrincipalCV(userData.profile.stxAddress)],
        network,
      });
      setStakerInfo(result.value);
    } catch (error) {
      console.error('Error fetching staker info:', error);
    }
  }

  async function fetchContractInfo() {
    try {
      const rewardRate = await callReadOnlyFunction({
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: 'get-reward-rate',
        functionArgs: [],
        network,
      });
      const totalSupply = await callReadOnlyFunction({
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: 'get-total-supply',
        functionArgs: [],
        network,
      });
      setContractInfo({
        rewardRate: rewardRate.value,
        totalSupply: totalSupply.value,
      });
    } catch (error) {
      console.error('Error fetching contract info:', error);
    }
  }

  async function stake(amount) {
    setLoading(true);
    try {
      await doContractCall({
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: 'stake',
        functionArgs: [uintCV(amount)],
        onFinish: () => {
          fetchStakerInfo();
          fetchContractInfo();
          setLoading(false);
        },
        onCancel: () => setLoading(false),
      });
    } catch (error) {
      console.error('Error staking:', error);
      setLoading(false);
    }
  }

  async function withdraw(amount) {
    setLoading(true);
    try {
      await doContractCall({
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: 'withdraw',
        functionArgs: [uintCV(amount)],
        onFinish: () => {
          fetchStakerInfo();
          fetchContractInfo();
          setLoading(false);
        },
        onCancel: () => setLoading(false),
      });
    } catch (error) {
      console.error('Error withdrawing:', error);
      setLoading(false);
    }
  }

  async function claimReward() {
    setLoading(true);
    try {
      await doContractCall({
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: 'claim-reward',
        functionArgs: [],
        onFinish: () => {
          fetchStakerInfo();
          fetchContractInfo();
          setLoading(false);
        },
        onCancel: () => setLoading(false),
      });
    } catch (error) {
      console.error('Error claiming reward:', error);
      setLoading(false);
    }
  }

  return {
    stakerInfo,
    contractInfo,
    loading,
    stake,
    withdraw,
    claimReward,
  };
}
