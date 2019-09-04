import Header from "../../components/Header";
import { shallow } from "enzyme";
import React from "react";

describe("Test Header Component", () => {
  test("It should match the snapshot", () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
  });
});
