import counterReducer, {
    decrement,
    increment,
    incrementAsync,
    incrementByAmount,
    reset,
} from "../../store/counterSlice";

describe("Counter Reducer", () => {
  const initialState = { value: 0 };

  it("should return the initial state", () => {
    expect(counterReducer(undefined, { type: "unknown" })).toEqual(
      initialState,
    );
  });

  it("should increment the value by 1", () => {
    const previousState = { value: 0 };
    const newState = counterReducer(previousState, increment());
    expect(newState.value).toBe(1);
  });

  it("should handle async increment", () => {
    const previousState = { value: 0 };
    const action = incrementAsync.fulfilled(5, "requestId", 5);
    const newState = counterReducer(previousState, action);
    expect(newState.value).toBe(5);
  });

  it("should decrement the value by 1", () => {
    const previousState = { value: 4 };
    const newState = counterReducer(previousState, decrement());
    expect(newState.value).toBe(3);
  });

  it("should reset the value by 0", () => {
    const previousState = { value: 4 };
    const newState = counterReducer(previousState, reset());
    expect(newState.value).toBe(0);
  });

  it("should increment by a specific amount", () => {
    const previousState = { value: 4 };
    const newState = counterReducer(previousState, incrementByAmount(6));
    expect(newState.value).toBe(10);
  });

  it("should handle multiple actions in sequence", () => {
    let state = initialState;
    state = counterReducer(state, increment());
    state = counterReducer(state, increment());
    state = counterReducer(state, incrementByAmount(5));
    state = counterReducer(state, decrement());
    expect(state.value).toBe(6);
  });
});
