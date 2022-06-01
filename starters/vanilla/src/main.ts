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
      <pre>${JSON.stringify(state.value)}</pre>
      <pre>${JSON.stringify(state.context, null, 2)}</pre>
    `;
  });
