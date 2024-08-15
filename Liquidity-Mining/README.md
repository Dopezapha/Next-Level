# Stacks Liquidity Mining Contract

This repository contains a Clarity smart contract for liquidity mining on the Stacks blockchain. The contract allows users to stake LP tokens and earn rewards in another token.

## Overview

The contract implements a basic liquidity mining mechanism where users can:

1. Stake LP tokens
2. Withdraw staked LP tokens
3. Claim rewards

The reward rate is configurable by the contract owner.

## Contract Details

- Language: Clarity
- Blockchain: Stacks

## Prerequisites

- Clarity language knowledge
- Stacks blockchain development environment (e.g., Clarinet)
- SIP-010 fungible token trait implementation

## Key Functions

1. `initialize`: Set up the contract with token addresses
2. `stake`: Stake LP tokens
3. `withdraw`: Withdraw staked LP tokens
4. `claim-reward`: Claim accumulated rewards
5. `set-reward-rate`: Update the reward rate (owner only)
6. `get-reward-rate`: Read current reward rate
7. `get-total-supply`: Get total staked amount
8. `get-staker-info`: Retrieve staker's information

## Setup and Deployment

1. Deploy the SIP-010 trait contract
2. Deploy your reward token and LP token contracts (must implement SIP-010)
3. Deploy this liquidity mining contract
4. Call the `initialize` function with the addresses of your token contracts

## Usage

Users can interact with the contract by calling the following functions:

- `stake`: To stake LP tokens
- `withdraw`: To unstake LP tokens
- `claim-reward`: To claim earned rewards

The contract owner can update the reward rate using the `set-reward-rate` function.

## Security Considerations

- This contract has not been audited and is for educational purposes only
- Thorough testing and a professional audit are strongly recommended before any production use
- Ensure proper access controls and parameter validations in a production environment

## Error Handling

The contract uses custom error codes for various scenarios:

- `ERR-NOT-AUTHORIZED` (u100): Caller is not the contract owner
- `ERR-NOT-INITIALIZED` (u101): Contract has not been initialized
- `ERR-ALREADY-INITIALIZED` (u102): Contract has already been initialized
- `ERR-INSUFFICIENT-BALANCE` (u103): User has insufficient balance for the operation

## Limitations and Future Improvements

- The contract uses block height as a proxy for time, which may not be ideal in all scenarios
- More sophisticated reward calculation mechanisms could be implemented
- Additional features like emergency withdrawal or reward lockup periods could be added

## License

The smart contract was written by Chukwudi Nwaneri using clarity 

## Disclaimer

This smart contract is provided as-is with no guarantees or warranties. Use at your own risk.