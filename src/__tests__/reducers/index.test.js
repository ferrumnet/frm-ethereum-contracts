import RootReducer from "../../redux/reducers";
import initialState from "../../redux/reducers/initialState";
import { createStore } from "redux";

const store = createStore(RootReducer);

describe("Root Reducer", () => {
  test("test root reducer", () => {});
  expect(store.getState()).toEqual(initialState);
});
