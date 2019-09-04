import AddRewardForm from "../../components/AddRewardForm";
import { shallow } from "enzyme";
import React from "react";

describe("Test AddRewardForm Component", () => {
  const props = {
    handleChange: jest.fn(),
    handleSubmit: jest.fn(),
    state: { amount: 0, withdrawable: 0 },
    loading: true
  };
  test("It should match the snapshot when loading is true", () => {
    const wrapper = shallow(<AddRewardForm {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  test("It should match the snapshot when loading is true", () => {
    const newProps = { ...props, loading: false };
    const wrapper = shallow(<AddRewardForm {...newProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
