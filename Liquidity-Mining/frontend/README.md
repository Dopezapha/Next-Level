## Liquidity Mining Dashboard

## Overview

This project is a React-based frontend for interacting with a Liquidity Mining smart contract on the Stacks blockchain. It provides a user-friendly interface for users to stake LP tokens, withdraw tokens, claim rewards, and view contract and staker information.

## Features

- Stake LP tokens
- Withdraw staked LP tokens
- Claim rewards
- View staker information (balance and reward debt)
- View contract information (reward rate and total supply)
- Real-time updates of contract and staker information

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- A modern web browser
- Stacks-compatible wallet

## Installation

1. Clone the repository:
git clone https://github.com/Dopezapha/liquidity-Mining.git

2. Navigate to the project directory:
cd liquidity-Mining

3. Install the dependencies:
npm install @stacks/connect @stacks/transactions @stacks/network

4. Create a `.env` file in the root directory and add your contract address:
REACT_APP_CONTRACT_ADDRESS=YOUR_CONTRACT_ADDRESS_HERE

## Usage

1. Start the development server:
npm start

2. Open your web browser and visit `http://localhost:3000`

3. Connect your Stacks wallet when prompted

4. Use the interface to interact with the Liquidity Mining contract

## Configuration

The smart contract address is stored in `src/utils/constants.js`. Make sure to update this with your deployed contract address.

## Contributing

Contributions to this project are welcome. Please follow these steps:

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Commit your changes
5. Push to the branch
6. Open a Pull Request

## Contact
 Chukwudi Nwaneri or
 Email: officialnwaneridaniel@gmail.com