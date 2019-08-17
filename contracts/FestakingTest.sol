pragma solidity ^0.5.8;
import "./Festaking.sol";

contract FestakingTest is Festaking {
    uint public GAP = 60000;
    uint public SEC = 1000;

    constructor (string memory name_,
        address tokenAddress_,
        uint256 stakingCap_)
    Festaking(name_, tokenAddress_, now, now + GAP, now + GAP, now + GAP * 2, stakingCap_)
    public { }

    function setStakingPeriod() public {
        setStakingStart(now - SEC);
    }

    function setEarlyWithdrawalPeriod(uint offset) public {
        setStakingStart(now - GAP - offset);
    }

    function setAfterWithdrawal() public {
        setStakingStart(now - GAP * 2 - SEC);
    }

    function setStakingStart(uint time) private {
        stakingStarts = time;
        stakingEnds = time + GAP;
        withdrawStarts = time + GAP;
        withdrawEnds = time + GAP * 2;
    }
}
