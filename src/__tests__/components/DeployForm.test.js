import DeployForm from "../../components/DeployForm";
import { shallow } from "enzyme";
import React from "react";

describe("Test DeployForm Component", () => {
  const props = {
    stakingCap: 0,
    stakingStart: "",
    stakingEnd: "",
    withdrawStart: "",
    withdrawEnd: "",
    handleChange: jest.fn(),
    handleSubmit: jest.fn(),
    loading: true
  };
  test("It should match the snapshot when loading is true", () => {
    const wrapper = shallow(<DeployForm {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  test("It should match the snapshot when loading is false", () => {
    const newProps = { ...props, loading: false };
    const wrapper = shallow(<DeployForm {...newProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
