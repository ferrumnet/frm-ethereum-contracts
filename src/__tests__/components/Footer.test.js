import Footer from "../../components/Footer";
import { shallow } from "enzyme";
import React from "react";

describe("Test Footer Component", () => {
  test("It should match the snapshot", () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper).toMatchSnapshot();
  });
});
