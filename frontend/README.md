# Bitcoin Staking and Yield Optimization Frontend

## Overview

This React-based frontend application provides a user interface for interacting with a Bitcoin Staking and Yield Optimization smart contract. It allows users to stake and unstake Bitcoin, manage liquidity, and engage in leveraged trading.

## Features

- Connect to Web3-enabled wallets (e.g., MetaMask)
- View account information and balances
- Stake and unstake Bitcoin
- Add and remove liquidity
- Open and close leveraged positions
- Real-time updates of account status

## Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- A Web3-enabled browser or extension (e.g., MetaMask)
- Access to an Ethereum network (mainnet, testnet, or local)

## Installation

1. Clone the repository:
git clone https://github.com/Dopezapha/NEXT-LEVEL.git
cd NEXT-LEVEL, cd frontend

2. Install dependencies:
npm install

3. Configure the smart contract:
- Open `src/utils/constants.js`
- Replace `YOUR_CONTRACT_ADDRESS_HERE` with your deployed contract address
- Update the `CONTRACT_ABI` array with your contract's ABI

## Running the Application

1. Start the development server:
npm start

2. Open your browser and navigate to `http://localhost:3000`

## Components

- **AccountInfo**: Displays user's account address, BTC stake, liquidity, and leveraged position.
- **StakingForm**: Allows users to stake and unstake BTC.
- **LiquidityForm**: Enables users to add and remove liquidity.
- **LeverageForm**: Provides interface for opening and closing leveraged positions.

## Context

- **Web3Context**: Manages Web3 connection, contract interactions, and global state.

## Hooks

- **useWeb3**: Custom hook for initializing Web3 and contract instance.

## Styling

The application uses CSS Modules for component-specific styling. Global styles are defined in `index.css`.

## Smart Contract Integration

The frontend interacts with the smart contract through the Web3.js library. The contract address and ABI are stored in `src/utils/constants.js`.

## Error Handling

- Input validation is implemented in all forms.
- Error messages are displayed for failed transactions.
- Console logging for detailed error information.


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.