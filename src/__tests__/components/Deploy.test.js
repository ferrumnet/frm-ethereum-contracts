import DeployInfo from "../../components/DeployInfo";
import { shallow } from "enzyme";
import React from "react";

describe("Test DeployInfo Component", () => {
  const props = {
    stakingCap: 0,
    stakingStart: "",
    stakingEnd: "",
    withdrawStart: "",
    withdrawEnd: "",
    loading: true
  };
  test("It should match the snapshot when loading is true", () => {
    const wrapper = shallow(<DeployInfo {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  test("It should match the snapshot when loading is false", () => {
    const newProps = { ...props, loading: false };
    const wrapper = shallow(<DeployInfo {...newProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
