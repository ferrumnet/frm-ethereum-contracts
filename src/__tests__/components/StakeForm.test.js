import { StakeStepper } from "../../components/StakeForm";
import { shallow } from "enzyme";
import React from "react";

describe("Test StakeForm Component", () => {
  test("It should match the snapshot of StakeStepper when step is 1", () => {
    const props = {
      amount: 1000,
      step: 1,
      handleSubmit: jest.fn(),
      handleChange: jest.fn(),
      cancel: jest.fn(),
      validateStake: jest.fn(),
      authorizeStake: jest.fn()
    };
    const wrapper = shallow(<StakeStepper {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  test("It should match the snapshot of StakeStepper when step is 2", () => {
    const props = {
      amount: 1000,
      step: 2,
      handleSubmit: jest.fn(),
      handleChange: jest.fn(),
      cancel: jest.fn(),
      validateStake: jest.fn(),
      authorizeStake: jest.fn()
    };
    const wrapper = shallow(<StakeStepper {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  test("It should match the snapshot of StakeStepper when step is 3", () => {
    const props = {
      amount: 1000,
      step: 3,
      handleSubmit: jest.fn(),
      handleChange: jest.fn(),
      cancel: jest.fn(),
      validateStake: jest.fn(),
      authorizeStake: jest.fn()
    };
    const wrapper = shallow(<StakeStepper {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  test("It should match the snapshot of StakeStepper on default", () => {
    const props = {
      amount: 1000,
      step: null,
      handleSubmit: jest.fn(),
      handleChange: jest.fn(),
      cancel: jest.fn(),
      validateStake: jest.fn(),
      authorizeStake: jest.fn()
    };
    const wrapper = shallow(<StakeStepper {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
