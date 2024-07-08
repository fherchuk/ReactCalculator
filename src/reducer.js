import { ACTIONS } from "./App";

export const initialState = {
  current: null,
  previous: null,
  operation: null,
  overwrite: false,
};

export function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      return handleAddDigit(state, payload);
    case ACTIONS.CHOOSE_OPERATION:
      return handleChooseOperation(state, payload);
    case ACTIONS.CLEAR:
      return initialState;
    case ACTIONS.DELETE_DIGIT:
      return handleDeleteDigit(state);
    case ACTIONS.EVALUATE:
      return handleEvaluate(state);
    case ACTIONS.PERCENTAGE:
      return handlePercentage(state);
    default:
      return state;
  }
}

function handleAddDigit(state, payload) {
  if (state.overwrite && payload.digit !== "+/-") {
    return {
      ...state,
      current: payload.digit,
      overwrite: false,
    };
  }

  if (payload.digit === "+/-" && state.current?.includes("-")) return state;
  if (
    payload.digit === "+/-" &&
    (state.current == null || state.current === "0")
  )
    return state;
  if (payload.digit === "+/-") {
    return {
      ...state,
      current: `-${state.current}`,
    };
  }

  if (payload.digit !== "." && state.current === "0") {
    return { ...state, current: payload.digit };
  }

  if (payload.digit === "." && state.current?.includes(".")) return state;

  return {
    ...state,
    current: `${state.current || ""}${payload.digit}`,
  };
}

function handleChooseOperation(state, payload) {
  if (state.current == null && state.previous == null) {
    return state;
  }

  if (state.current == null) {
    return {
      ...state,
      operation: payload.operation,
    };
  }

  if (state.previous == null) {
    return {
      ...state,
      operation: payload.operation,
      previous: state.current,
      current: null,
    };
  }

  return {
    ...state,
    previous: evaluate(state),
    operation: payload.operation,
    current: null,
  };
}

function handleDeleteDigit(state) {
  if (state.overwrite) {
    return {
      ...state,
      overwrite: false,
      current: null,
    };
  }

  if (state.current == null) return state;

  if (state.current.length === 1) {
    return {
      ...state,
      current: null,
    };
  }

  return {
    ...state,
    current: state.current.slice(0, -1),
  };
}

function handleEvaluate(state) {
  if (
    state.operation == null ||
    state.current == null ||
    state.previous == null
  ) {
    return state;
  }

  return {
    ...state,
    overwrite: true,
    previous: null,
    operation: null,
    current: evaluate(state),
  };
}

function handlePercentage(state) {
  if (state.current === "0" || state.current == null) return state;

  let percentage = parseFloat(state.current) * 0.01;
  percentage = Number(percentage.toPrecision(10)).toString();

  return {
    ...state,
    current: percentage,
  };
}

function evaluate({ current, previous, operation }) {
  const prev = parseFloat(previous);
  const curr = parseFloat(current);

  if (isNaN(prev) || isNaN(curr)) return "";

  let computation = "";

  switch (operation) {
    case "+":
      computation = prev + curr;
      break;
    case "-":
      computation = prev - curr;
      break;
    case "*":
      computation = prev * curr;
      break;
    case "÷":
      computation = prev / curr;
      break;
    default:
      return "";
  }

  return parseFloat(computation.toPrecision(10)).toString();
}

export const createAddDigitAction = (digit) => ({
  type: ACTIONS.ADD_DIGIT,
  payload: { digit },
});

export const createChooseOperationAction = (operation) => ({
  type: ACTIONS.CHOOSE_OPERATION,
  payload: { operation },
});

export const createClearAction = () => ({
  type: ACTIONS.CLEAR,
});

export const createDeleteDigitAction = () => ({
  type: ACTIONS.DELETE_DIGIT,
});

export const createEvaluateAction = () => ({
  type: ACTIONS.EVALUATE,
});

export const createPercentageAction = () => ({
  type: ACTIONS.PERCENTAGE,
});
