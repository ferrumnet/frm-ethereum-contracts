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


## How to add contract to Etherscan.io

1. Paste the flatenned contract ABI JSON (from `dist` folder) to REMIX
2. Compile and deploy the contract (using REMIX or the dashboard). Take an exact note of the constructor arguments.
3. Go to `https://abi.hashex.org/#`, paste the ABI JSON, and fill up constructor arguments to get the ABI encoded data
4. In Etherscan, on the contract tab, select `add source and verify`. Then paste the flattened contract code, and ABI encoded constructor data obtaied at step 3.

