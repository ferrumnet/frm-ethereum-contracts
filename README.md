# Ferrum Token Ethereum Contracts

## ERC20 Token

We use a basic `burnable` ERC20 contract for Ferrum Network tokens. The contract implementations is directly based on the (https://github.com/OpenZeppelin/openzeppelin-contracts)[OpenZepplin] implementation of ERC-20.

## Festaking

Festaking is a flexible staking contract for ERC20 tokens.

It supports the following configuration:

- Constant guaranteed time based return. For example 10% return per month.
  Payout rewards are calculated based on mining time.
- Reward distribution after maturity. Staking contract can have a maturity
  date and a fixed reward amount which will be distributed between amounts
  that were not withdrawn until maturity time.
- Mix of above.
- Cap staking amount and time-boxed staking period.
- Prevent withdraw before a given withdraw start date.
- No compounded return. Returns are linearly distributed.

### Festaking Parameters

```
        address tokenAddress_,
        uint stakingStarts_,
        uint stakingEnds_,
        uint withdrawStarts_,
        uint withdrawEnds_,
        uint256 stakingCap_
```

Note, reward distribution period starts after `stakingEnds`.

### Examples

To generate a hypothetical staking with 10% ARR return with a `$` token:

```
stakingCap = $1000
stakingReward=$100;
earlyWithdrawReward=$100;
stakingStats = ...
stakingEnds = ...
withdrawStarts = stakingEnds
withdrawEnds = withdrawStarts + 1 year
```

To generate staking with minimum 5% ARR and minimum of
95%+ after maturity:

```
stakingCap = $1000
stakingReward=$1000;
earlyWithdrawReward=$50;
stakingStats = ...
stakingEnds = ...
withdrawStarts = stakingEnds
withdrawEnds = withdrawStarts + 1 year
```

To generate staking with 3 month maturity and 20% reward:

```
stakingCap = $1000
stakingReward=$300;
earlyWithdrawReward=$0;
stakingStats = ...
stakingEnds = ...
withdrawStarts = stakingEnds + 3 months
withdrawEnds = withdrawStarts + 3 months + 1 second
```

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

**Note** This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Prerequisites

Ensure that you have the following tools available on your machine;

- [Git](https://git-scm.com/) A distributed version control system
- [Nodejs](https://nodejs.org/en/) A JavaScript runtime built on Chrome's V8 JavaScript engine.
- One of the package managers [Yarn](https://yarnpkg.com/en/) or [Npm](https://www.npmjs.com/)

## Installing

While in your preferred terminal;

Start by cloning the repository to your local machine

```bash
git clone https://github.com/ferrumnet/frm-ethereum-contracts.git

cd frm-ethereum-contracts/
```

Install the package dependencies by running

```bash
npm install  # for npm users

yarn  # for yarn users

```

## Serving the application

```bash
  yarn start # For a local development server
  yarn build # For a production build
```

## Running the tests

```bash
yarn test

yarn test --coverage # test with coverage

```

## Linting files

This project uses [eslint](https://eslint.org/), a static analysis javascript tool frequently used to find problematic patterns or code that doesn’t adhere to certain style guidelines.

You can lint your files by running the command below

```bash
yarn lint
```
