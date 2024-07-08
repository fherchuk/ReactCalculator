import { useReducer, useEffect } from "react";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";
import "./styles.css";
import {
  initialState,
  reducer,
  createClearAction,
  createDeleteDigitAction,
  createEvaluateAction,
} from "./reducer";

import PercentageButton from "./PercentageButton";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
  PERCENTAGE: "percentage",
};

function App() {
  const [{ current, previous, operation }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const buttons = [
    { label: "AC", onClick: () => dispatch(createClearAction()) },
    { label: "DEL", onClick: () => dispatch(createDeleteDigitAction()) },
    {
      label: "%",
      component: PercentageButton,
      props: { percentage: "%", dispatch },
    },
    {
      label: "/",
      component: OperationButton,
      props: { operation: "÷", dispatch },
    },
    { label: "7", component: DigitButton, props: { digit: "7", dispatch } },
    { label: "8", component: DigitButton, props: { digit: "8", dispatch } },
    { label: "9", component: DigitButton, props: { digit: "9", dispatch } },
    {
      label: "*",
      component: OperationButton,
      props: { operation: "*", dispatch },
    },
    { label: "4", component: DigitButton, props: { digit: "4", dispatch } },
    { label: "5", component: DigitButton, props: { digit: "5", dispatch } },
    { label: "6", component: DigitButton, props: { digit: "6", dispatch } },
    {
      label: "+",
      component: OperationButton,
      props: { operation: "+", dispatch },
    },
    { label: "1", component: DigitButton, props: { digit: "1", dispatch } },
    { label: "2", component: DigitButton, props: { digit: "2", dispatch } },
    { label: "3", component: DigitButton, props: { digit: "3", dispatch } },
    {
      label: "-",
      component: OperationButton,
      props: { operation: "-", dispatch },
    },
    { label: "+/-", component: DigitButton, props: { digit: "+/-", dispatch } },
    { label: "0", component: DigitButton, props: { digit: "0", dispatch } },
    { label: ".", component: DigitButton, props: { digit: ".", dispatch } },
    { label: "=", onClick: () => dispatch(createEvaluateAction()) },
  ];

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Calculator</h1>
      </header>
      <div className="calc-grid">
        <div className="output">
          <div className="previous-operand">
            {previous} {operation}
          </div>
          <div className="current-operand">{current}</div>
        </div>
        {buttons.map((button, index) => {
          const Component = button.component || "button";
          const props = button.props || { onClick: button.onClick };
          return (
            <Component key={index} {...props}>
              {button.label}
            </Component>
          );
        })}
      </div>
    </div>
  );
}

export default App;
