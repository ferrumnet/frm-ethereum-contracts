import Loader from "../../components/common/Loader";
import { shallow } from "enzyme";
import React from "react";

describe("Test Loader Component", () => {
  test("It should match the snapshot", () => {
    const wrapper = shallow(<Loader />);
    expect(wrapper).toMatchSnapshot();
  });
});
