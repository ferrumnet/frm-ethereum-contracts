import { WithdrawStepper } from "../../components/WithdrawForm";
import { shallow } from "enzyme";
import React from "react";

describe("Test WithdrawForm Component", () => {
  test("It should match the snapshot of WithdrawStepper when step is 1", () => {
    const props = {
      amount: 1000,
      step: 1,
      handleSubmit: jest.fn(),
      handleChange: jest.fn(),
      prevStep: jest.fn(),
      validateWithdraw: jest.fn()
    };
    const wrapper = shallow(<WithdrawStepper {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  test("It should match the snapshot of WithdrawStepper when step is 2", () => {
    const props = {
      amount: 1000,
      step: 2,
      handleSubmit: jest.fn(),
      handleChange: jest.fn(),
      prevStep: jest.fn(),
      validateStake: jest.fn(),
      authorizeStake: jest.fn()
    };
    const wrapper = shallow(<WithdrawStepper {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  test("It should match the snapshot of WithdrawStepper on default", () => {
    const props = {
      amount: 1000,
      step: null,
      handleSubmit: jest.fn(),
      handleChange: jest.fn(),
      prevStep: jest.fn(),
      validateStake: jest.fn(),
      authorizeStake: jest.fn()
    };
    const wrapper = shallow(<WithdrawStepper {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
