## Task Reward or Bounty Smart Contract

## ABOUT
The Task Reward Smart Contract is a Clarity smart contract designed for the Stacks blockchain. It facilitates a decentralized task management system where users can create tasks, offer rewards, and allow others to complete these tasks and claim the rewards. This contract can be used for various applications such as bounty systems, freelance marketplaces, or any scenario where tasks need to be created, completed, and rewarded.


## Features

Create tasks with descriptions and reward amounts
Complete tasks and claim rewards
Cancel tasks (only by the task initiator)
View task details
Retrieve open tasks
Automatic reward transfer upon task completion
Time-stamping for task creation and completion

## Contract Overview
The contract maintains a map of tasks, each with the following properties:

1. Task ID
2. Initiator (creator of the task)
3. Details (description of the task)
4. Compensation (reward amount)
5. Status (open or closed)
6. Solver (address of the task completer, if any)
7. Created at (timestamp)
8. Completed at (timestamp, if completed)


### Functions
## Public Functions

initiate-task: Create a new task with a description and reward amount.
complete-task: Complete a task and claim the reward.
cancel-task: Cancel an open task (only available to the task initiator).

## Read-Only Functions

get-task-details: Retrieve details of a specific task.
get-total-tasks: Get the total number of tasks created.
get-open-tasks: Retrieve a list of open tasks.

## Error Codes

ERR_UNAUTHORIZED (u100): User is not authorized to perform the action.
ERR_INVALID_AMOUNT (u101): The reward amount is invalid (must be greater than zero).
ERR_INSUFFICIENT_BALANCE (u102): The initiator doesn't have enough balance to create the task.
ERR_TASK_NOT_FOUND (u103): The specified task does not exist.
ERR_TASK_NOT_OPEN (u104): The task is not open for completion.
ERR_TASK_ALREADY_COMPLETED (u105): The task has already been completed.
ERR_CANNOT_COMPLETE_OWN_TASK (u106): The initiator cannot complete their own task.

## Security Considerations

1. The contract ensures that only the task initiator can cancel a task.
2. Task initiators cannot complete their own tasks to prevent self-dealing.
3. The contract verifies sufficient balance before allowing task creation.
4. Rewards are locked in the contract until a task is completed or canceled.

## Development and Testing
To develop and test this contract:

Set up a Clarity development environment (e.g., Clarinet).
Write unit tests for each function to ensure proper functionality.
Test edge cases and error conditions.
Consider using property-based testing for more comprehensive coverage.

## Deployment
To deploy this contract:

Ensure you have a Stacks wallet with sufficient STX for deployment.
Use the Stacks CLI or a deployment tool like Clarinet to deploy the contract.
Verify the contract on the Stacks explorer after deployment.

## Contributing
Contributions to improve the contract are welcome. Please follow these steps:

Fork the repository.
Create a new branch for your feature or bug fix.
Make your changes and write tests.
Submit a pull request with a clear description of your changes.

## AUTHOR
Chukwudi Daniel Nwaneri