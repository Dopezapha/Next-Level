import { StacksMainnet, StacksMocknet } from '@stacks/network';
import { 
  callReadOnlyFunction, 
  createAssetInfo, 
  makeContractCall,
  broadcastTransaction,
  AnchorMode,
  FungibleConditionCode,
  makeStandardSTXPostCondition,
  standardPrincipalCV,
  uintCV,
  stringAsciiCV,
} from '@stacks/transactions';
import { userSession, openContractCall } from '@stacks/connect';

// Set up the network (use StacksMainnet for production)
const network = new StacksMocknet();

// Contract details
const contractAddress = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
const contractName = 'enhanced-pension-fund';

// Helper function to get user address
const getUserAddress = () => userSession.loadUserData().profile.stxAddress.testnet;

// Register user
export const registerUser = async (birthYear) => {
  const functionArgs = [uintCV(birthYear)];
  const options = {
    contractAddress,
    contractName,
    functionName: 'register-user',
    functionArgs,
    network,
    appDetails: {
      name: 'Enhanced Pension Fund',
      icon: window.location.origin + '/app-icon.png',
    },
    onFinish: (data) => {
      console.log('Transaction:', data);
    },
  };

  await openContractCall(options);
};

// User contribute
export const userContribute = async (contributionAmount, investmentOptionId) => {
  const postConditions = [
    makeStandardSTXPostCondition(
      getUserAddress(),
      FungibleConditionCode.LessEqual,
      contributionAmount
    ),
  ];

  const functionArgs = [
    uintCV(contributionAmount),
    uintCV(investmentOptionId)
  ];

  const options = {
    contractAddress,
    contractName,
    functionName: 'user-contribute',
    functionArgs,
    postConditions,
    network,
    appDetails: {
      name: 'Enhanced Pension Fund',
      icon: window.location.origin + '/app-icon.png',
    },
    onFinish: (data) => {
      console.log('Transaction:', data);
    },
  };

  await openContractCall(options);
};

// User withdraw
export const userWithdraw = async (withdrawalAmount, investmentOptionId) => {
  const functionArgs = [
    uintCV(withdrawalAmount),
    uintCV(investmentOptionId)
  ];

  const options = {
    contractAddress,
    contractName,
    functionName: 'user-withdraw',
    functionArgs,
    network,
    appDetails: {
      name: 'Enhanced Pension Fund',
      icon: window.location.origin + '/app-icon.png',
    },
    onFinish: (data) => {
      console.log('Transaction:', data);
    },
  };

  await openContractCall(options);
};

// Employer contribute
export const employerContribute = async (contributionAmount, investmentOptionId, employeeAddress) => {
  const postConditions = [
    makeStandardSTXPostCondition(
      getUserAddress(),
      FungibleConditionCode.LessEqual,
      contributionAmount
    ),
  ];

  const functionArgs = [
    uintCV(contributionAmount),
    uintCV(investmentOptionId),
    standardPrincipalCV(employeeAddress)
  ];

  const options = {
    contractAddress,
    contractName,
    functionName: 'employer-contribute',
    functionArgs,
    postConditions,
    network,
    appDetails: {
      name: 'Enhanced Pension Fund',
      icon: window.location.origin + '/app-icon.png',
    },
    onFinish: (data) => {
      console.log('Transaction:', data);
    },
  };

  await openContractCall(options);
};

// Set employee's employer
export const setEmployeeEmployer = async (employeeAddress) => {
  const functionArgs = [standardPrincipalCV(employeeAddress)];

  const options = {
    contractAddress,
    contractName,
    functionName: 'set-employee-employer',
    functionArgs,
    network,
    appDetails: {
      name: 'Enhanced Pension Fund',
      icon: window.location.origin + '/app-icon.png',
    },
    onFinish: (data) => {
      console.log('Transaction:', data);
    },
  };

  await openContractCall(options);
};

// Update retirement age (admin function)
export const updateRetirementAge = async (newRetirementAge) => {
  const functionArgs = [uintCV(newRetirementAge)];

  const options = {
    contractAddress,
    contractName,
    functionName: 'update-retirement-age',
    functionArgs,
    network,
    appDetails: {
      name: 'Enhanced Pension Fund',
      icon: window.location.origin + '/app-icon.png',
    },
    onFinish: (data) => {
      console.log('Transaction:', data);
    },
  };

  await openContractCall(options);
};

// Add investment option (admin function)
export const addInvestmentOption = async (optionName, riskLevel) => {
  const functionArgs = [
    stringAsciiCV(optionName),
    uintCV(riskLevel)
  ];

  const options = {
    contractAddress,
    contractName,
    functionName: 'add-investment-option',
    functionArgs,
    network,
    appDetails: {
      name: 'Enhanced Pension Fund',
      icon: window.location.origin + '/app-icon.png',
    },
    onFinish: (data) => {
      console.log('Transaction:', data);
    },
  };

  await openContractCall(options);
};

// Register employer (admin function)
export const registerEmployer = async (employerAddress) => {
  const functionArgs = [standardPrincipalCV(employerAddress)];

  const options = {
    contractAddress,
    contractName,
    functionName: 'register-employer',
    functionArgs,
    network,
    appDetails: {
      name: 'Enhanced Pension Fund',
      icon: window.location.origin + '/app-icon.png',
    },
    onFinish: (data) => {
      console.log('Transaction:', data);
    },
  };

  await openContractCall(options);
};

// Read-only functions

// Get user profile
export const getUserProfile = async (userAddress) => {
  const result = await callReadOnlyFunction({
    contractAddress,
    contractName,
    functionName: 'get-user-profile',
    functionArgs: [standardPrincipalCV(userAddress)],
    network,
  });

  return result.value;
};

// Get user balance
export const getUserBalance = async (userAddress, investmentOptionId) => {
  const result = await callReadOnlyFunction({
    contractAddress,
    contractName,
    functionName: 'get-user-balance',
    functionArgs: [
      standardPrincipalCV(userAddress),
      uintCV(investmentOptionId)
    ],
    network,
  });

  return result.value;
};

// Check if user is eligible for withdrawal
export const isEligible = async (userAddress) => {
  const result = await callReadOnlyFunction({
    contractAddress,
    contractName,
    functionName: 'is-eligible',
    functionArgs: [standardPrincipalCV(userAddress)],
    network,
  });

  return result.value;
};

// Get investment option details
export const getInvestmentOptionDetails = async (optionId) => {
  const result = await callReadOnlyFunction({
    contractAddress,
    contractName,
    functionName: 'get-investment-option-details',
    functionArgs: [uintCV(optionId)],
    network,
  });

  return result.value;
};

// Check if an address is a registered employer
export const isEmployer = async (employerAddress) => {
  const result = await callReadOnlyFunction({
    contractAddress,
    contractName,
    functionName: 'is-employer',
    functionArgs: [standardPrincipalCV(employerAddress)],
    network,
  });

  return result.value;
};
