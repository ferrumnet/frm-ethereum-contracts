import React from "react";
import { mount } from "enzyme";
import WithdrawDefault, { WithDraw } from "../../containers/WithDraw";
import store from "../../redux/store";

const props = {
  withdrawFunc: jest.fn(),
  varsFunc: jest.fn(),
  withdrawToDefaultState: jest.fn(),
  contract: { data: {} },
  stake: {
    variables: {
      balanceOf: 90,
      stakedBalance: 100,
      stakedTotal: 70,
      earlyWithdrawReward: 10,
      rewardBalance: 40,
      stakeOf: 10
    }
  },
  withdraw: { loading: false, complete: false }
};

describe("stake container tests", () => {
  let withdrawComponent, instance;

  beforeEach(() => {
    withdrawComponent = mount(<WithDraw {...props} />);
    instance = withdrawComponent.instance();
  });

  it("render component", () => {
    withdrawComponent = mount(<WithdrawDefault store={store} />);
    expect(withdrawComponent).toHaveLength(1);
  });

  it("calls deployContractAction when no data", () => {
    const props = {
      withdrawFunc: jest.fn(),
      varsFunc: jest.fn(),
      deployContractAction: jest.fn(),
      withdrawToDefaultStateFunc: jest.fn(),
      contract: {},
      stake: {
        variables: {
          balanceOf: 90,
          stakedBalance: 100,
          stakedTotal: 70,
          earlyWithdrawReward: 10,
          rewardBalance: 40,
          stakeOf: 10
        }
      },
      withdraw: { loading: true, complete: false }
    };
    withdrawComponent = mount(<WithDraw {...props} />);
    expect(props.deployContractAction).toHaveBeenCalled();
  });

  it("should render stake form", () => {
    const form = withdrawComponent.find("form");
    expect(form).toHaveLength(1);
  });

  it("should call handleChange when input changes", () => {
    const handleChangeSpy = jest.spyOn(instance, "handleChange");
    const amountInput = withdrawComponent.find("#amount-input");
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

  it("should maintain step 1", () => {
    withdrawComponent.find("button").simulate("click", {
      preventDefault: jest.fn()
    });
    instance.forceUpdate();
    expect(instance.state.step).toEqual(1);
  });

  it("should maintain step 1 when stakeOf < amount", () => {
    instance.setState({ amount: 20 });
    withdrawComponent.find("button").simulate("click", {
      preventDefault: jest.fn()
    });
    instance.forceUpdate();
    expect(instance.state.step).toEqual(1);
  });

  it("should change step 2 when stakeOf > amount", () => {
    instance.setState({ amount: 5 });
    withdrawComponent.find("button").simulate("click", {
      preventDefault: jest.fn()
    });
    instance.forceUpdate();
    expect(instance.state.step).toEqual(2);
  });

  it("should reset step", () => {
    instance.setState({ step: 2 });
    instance.resetStep();
    expect(instance.state.step).toEqual(1);
  });

  it("should call handleSubmit when form button is clicked", () => {
    const handleSubmitSpy = jest.spyOn(instance, "handleSubmit");

    const amountInput = withdrawComponent.find("#amount-input");
    instance.forceUpdate();
    amountInput.simulate("change", {
      target: {
        name: "amount",
        value: 100
      }
    });

    withdrawComponent.find("form").simulate("submit", {
      preventDefault: jest.fn()
    });
    instance.handleSubmit();
    expect(handleSubmitSpy).toHaveBeenCalled();
  });
});
