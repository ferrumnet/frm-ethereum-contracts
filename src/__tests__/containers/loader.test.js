import React from "react";
import { mount } from "enzyme";
import LoaderDefault, { Loader } from "../../containers/Loader";
import store from "../../redux/store";

describe("test loader", () => {
  it("should load", () => {
    const component = mount(<Loader loading={true} />);
    expect(component.length).toBe(1);
  });

  it("should when prop is different", () => {
    const component = mount(<Loader loading={false} />);
    expect(component.length).toBe(1);
  });

  it("should when prop is different", () => {
    const component = mount(<LoaderDefault store={store} />);
    expect(component.length).toBe(1);
  });
});
