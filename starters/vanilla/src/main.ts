import { createMachine, interpret } from "xstate";

const app = document.querySelector<HTMLDivElement>("#app")!;

const machine = createMachine({});

/**
 * Runs the machine and shows it on screen
 */
interpret(machine)
  .start()
  .subscribe((state) => {
    app.innerHTML = `
      <code>${state.value}</code>
      <pre>${JSON.stringify(state.context, null, 2)}</pre>
    `;
  });
