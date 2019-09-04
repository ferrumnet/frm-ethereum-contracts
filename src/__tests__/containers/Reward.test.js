import React from "react";
import { mount } from "enzyme";
import AddRewardDefault, { AddReward } from "../../containers/Rewards";
import store from "../../redux/store";

const props = {
  contract: { data: {} },
  addReward: jest.fn(),
  reward: { loading: false }
};

describe("reward container tests", () => {
  let addRewardComponent, instance, addReward;

  beforeEach(() => {
    addRewardComponent = mount(<AddReward {...props} />);
    instance = addRewardComponent.instance();
  });

  it("render component", () => {
    addRewardComponent = mount(<AddRewardDefault store={store} />);
    expect(addRewardComponent).toHaveLength(1);
  });

  it("calls deployContractAction when no data", () => {
    const props = {
      contract: {},
      deployContractAction: jest.fn(),
      addReward: jest.fn(),
      reward: { loading: false }
    };
    addReward = mount(<AddReward {...props} />);
    expect(props.deployContractAction).toHaveBeenCalled();
  });

  it("should render addreward form", () => {
    const form = addRewardComponent.find("form");
    expect(form).toHaveLength(1);
  });

  it("should call handleChange when input changes", () => {
    const handleChangeSpy = jest.spyOn(instance, "handleChange");
    const rewardAmoutInput = addRewardComponent.find("#reward-amount");
    const event = {
      target: {
        name: "amount",
        value: 100
      }
    };
    instance.forceUpdate();
    rewardAmoutInput.simulate("change", event);
    expect(handleChangeSpy).toHaveBeenCalled();
  });

  it("should call handleSubmit when form button is clicked", () => {
    const handleSubmitSpy = jest.spyOn(instance, "handleSubmit");

    instance.setState({ amount: 100, withdrawable: 50 });

    addRewardComponent.find("form").simulate("submit", {
      preventDefault: jest.fn()
    });
    instance.handleSubmit();
    expect(handleSubmitSpy).toHaveBeenCalled();
  });

  it("should call handleSubmit when amount & withdrawable =0 ", () => {
    const handleSubmitSpy = jest.spyOn(instance, "handleSubmit");
    instance.setState({ amount: 0, withdrawable: 0 });

    addRewardComponent.find("form").simulate("submit", {
      preventDefault: jest.fn()
    });
    expect(handleSubmitSpy).toHaveBeenCalled();
  });

  it("should call handleSubmit when amount > withdrawable ", () => {
    const handleSubmitSpy = jest.spyOn(instance, "handleSubmit");
    instance.setState({ amount: 10, withdrawable: 50 });

    addRewardComponent.find("form").simulate("submit", {
      preventDefault: jest.fn()
    });
    expect(handleSubmitSpy).toHaveBeenCalled();
  });
});
