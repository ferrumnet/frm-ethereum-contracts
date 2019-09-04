import React from "react";
import { mount } from "enzyme";
import StakeDefault, { Stake } from "../../containers/Stake";
import store from "../../redux/store";

const props = {
  stakeFunc: jest.fn(),
  authorizeAddStakeFunc: jest.fn(),
  varsFunc: jest.fn(),
  approveStakeSuccesfullFunc: jest.fn(),
  contract: {
    data: {
      STAKING_CAP: 1000,
      festaking: jest.fn(),
      frm: {
        methods: {
          allowance: (acc, acc1) => ({
            call: jest.fn()
          })
        }
      },
      contractAddress: "00",
      ac1: "00"
    }
  },
  stake: {
    loading: false,
    complete: false,
    variables: { rewardBalance: 0, stakedBalance: 10 }
  }
};

describe("stake container tests", () => {
  let stakeComponent, instance;

  beforeEach(() => {
    stakeComponent = mount(<Stake {...props} />);
    instance = stakeComponent.instance();
  });

  it("render component", () => {
    stakeComponent = mount(<StakeDefault store={store} />);
    expect(stakeComponent).toHaveLength(1);
  });

  it("calls deployContractAction when no data", () => {
    const props = {
      deployContractAction: jest.fn(),
      addReward: jest.fn(),
      stakeFunc: jest.fn(),
      authorizeAddStakeFunc: jest.fn(),
      approveStakeSuccesfullFunc: jest.fn(),
      contract: {},
      stake: {
        loading: true,
        complete: false,
        variables: { rewardBalance: 0, stakedBalance: 10 }
      }
    };
    stakeComponent = mount(<Stake {...props} />);
    expect(props.deployContractAction).toHaveBeenCalled();
  });

  it("should render stake form", () => {
    const form = stakeComponent.find("form");
    expect(form).toHaveLength(1);
  });

  it("should call handleChange when input changes", () => {
    const handleChangeSpy = jest.spyOn(instance, "handleChange");
    const amountInput = stakeComponent.find("#amount-input");
    const event = {
      target: {
        name: "amount",
        value: 100
      }
    };
    instance.forceUpdate();
    amountInput.simulate("change", event);
    expect(handleChangeSpy).toHaveBeenCalled();
  });

  it("should maintain step 1 amount is 0 ", () => {
    instance.setState({ amount: 0 });

    stakeComponent.find("button").simulate("click", {
      preventDefault: jest.fn()
    });
    expect(instance.state.step).toEqual(1);
  });

  it("should maintain step 1 if amount + stakedBalance > STAKING_CAP ", () => {
    instance.setState({ amount: 100000 });
    stakeComponent.find("button").simulate("click", {
      preventDefault: jest.fn()
    });
    expect(instance.state.step).toEqual(1);
  });

  it("should maitain step 1 if  rewardBalance <= 0  ", () => {
    instance.setState({ amount: 10 });
    instance.forceUpdate();
    stakeComponent.find("button").simulate("click", {
      preventDefault: jest.fn()
    });
    expect(instance.state.step).toEqual(1);
  });

  it("should change step 2 rewardBalance > 0 ", () => {
    instance.setState({ amount: 10 });
    instance.props.stake.variables.rewardBalance = 100;
    instance.forceUpdate();
    stakeComponent.find("button").simulate("click", {
      preventDefault: jest.fn()
    });
    expect(instance.state.step).toEqual(2);
  });

  it("should change step 2 rewardBalance > 0 ", () => {
    instance.setState({ amount: 10 });
    instance.props.stake.variables.rewardBalance = 10;
    instance.forceUpdate();
    instance.authorizeStake({ preventDefault: jest.fn() });
    expect(instance.state.step).toEqual(1);
  });
});
