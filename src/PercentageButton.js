import { ACTIONS } from "./App";
export default function PercentageButton({ dispatch, percentage }) {
  return (
    <button
      onClick={() =>
        dispatch({ type: ACTIONS.PERCENTAGE, payload: { percentage } })
      }
    >
      {percentage}
    </button>
  );
}
