import { createMachine, interpret } from "xstate";

const app = document.querySelector<HTMLDivElement>("#app")!;

const machine = createMachine({});

interpret(machine)
  .start()
  .subscribe((state) => {
    app.innerHTML = `
        <code>${state.value}</code>
        <pre>${JSON.stringify(state.context, null, 2)}</pre>
      `;
  });
