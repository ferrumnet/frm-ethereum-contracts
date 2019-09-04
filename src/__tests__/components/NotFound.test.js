import NotFound from "../../components/common/NotFound";
import { shallow } from "enzyme";
import React from "react";

describe("Test NotFound Component", () => {
  test("It should match the snapshot", () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper).toMatchSnapshot();
  });
});
