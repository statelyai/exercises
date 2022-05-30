import { useMachine } from "@xstate/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { createMachine } from "xstate";

const machine = createMachine({});

function App() {
  const [state, send] = useMachine(machine);

  return (
    <>
      <pre>{JSON.stringify(state.value)}</pre>
      <pre>{JSON.stringify(state.context)}</pre>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
