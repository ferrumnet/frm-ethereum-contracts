import React from "react";
import { mount } from "enzyme";
import DeployDefault, { Deploy } from "../../containers/Deploy";
import store from "../../redux/store";

describe("deploy tests", () => {
  let deployComponent, instance;
  const props = {
    deployContractAction: jest.fn(),
    fetchDeploymentValues: jest.fn(),
    contract: {
      data: { festaking: jest.fn() }
    }
  };

  beforeEach(() => {
    deployComponent = mount(<Deploy {...props} />);
    instance = deployComponent.instance();
  });

  it("should load successfully", () => {
    deployComponent = mount(<DeployDefault store={store} {...props} />);
    expect(deployComponent.length).toBe(1);
  });

  it("calls deployContractAction when no data", () => {
    const props = {
      contract: { data: { festaking: jest.fn() } },
      fetchDeploymentValues: jest.fn()
    };
    deployComponent = mount(<Deploy {...props} />);
    expect(props.fetchDeploymentValues).toHaveBeenCalled();
  });

  it("should call handleChange when input changes", () => {
    const handleChangeSpy = jest.spyOn(instance, "handleChange");
    const stakingCap = deployComponent.find("#stakingCap");
    const event = {
      target: {
        name: "stakingCap",
        value: 100
      }
    };
    instance.forceUpdate();
    stakingCap.simulate("change", event);
    expect(handleChangeSpy).toHaveBeenCalled();
  });

  it("should call handleSubmit when stakingCap <=0 ", () => {
    const handleSubmitSpy = jest.spyOn(instance, "handleSubmit");
    instance.setState({ stakingCap: 0 });
    deployComponent.find("form").simulate("submit", {
      preventDefault: jest.fn()
    });
    expect(handleSubmitSpy).toHaveBeenCalled();
  });

  it("should call handleSubmit when stakingEndSec < stakingStartSec ", () => {
    const handleSubmitSpy = jest.spyOn(instance, "handleSubmit");
    instance.setState({ stakingCap: 10, stakingEnd: 100, stakingStart: 13000 });
    deployComponent.find("form").simulate("submit", {
      preventDefault: jest.fn()
    });
    expect(handleSubmitSpy).toHaveBeenCalled();
  });

  it("should call handleSubmit when stakingEndSec > withdrawStartSec ", () => {
    const handleSubmitSpy = jest.spyOn(instance, "handleSubmit");
    instance.setState({
      stakingCap: 10,
      stakingEnd: 1400,
      stakingStart: 1000,
      withdrawStart: 1300
    });
    deployComponent.find("form").simulate("submit", {
      preventDefault: jest.fn()
    });
    expect(handleSubmitSpy).toHaveBeenCalled();
  });

  it("should call handleSubmit when withdrawEndSec < withdrawStartSec ", () => {
    const handleSubmitSpy = jest.spyOn(instance, "handleSubmit");
    instance.setState({
      stakingCap: 10,
      stakingEnd: 1300,
      stakingStart: 1000,
      withdrawStart: 1500,
      withdrawEnd: 1400
    });

    deployComponent.find("form").simulate("submit", {
      preventDefault: jest.fn()
    });
    expect(handleSubmitSpy).toHaveBeenCalled();
  });

  it("should call handleSubmit when every condition is fine ", () => {
    const handleSubmitSpy = jest.spyOn(instance, "handleSubmit");
    instance.setState({
      stakingCap: 10,
      stakingEnd: 1300,
      stakingStart: 1000,
      withdrawStart: 1500,
      withdrawEnd: 1600
    });

    deployComponent.find("form").simulate("submit", {
      preventDefault: jest.fn()
    });
    expect(handleSubmitSpy).toHaveBeenCalled();
  });
});
