import { createMachine, interpret } from "xstate";

const app = document.querySelector<HTMLDivElement>("#app")!;

const machine = createMachine(
  {
    id: "My machine",
    initial: "Closed",
    states: {
      Closed: {
        on: {
          "Display Modal": {
            target: "Open",
          },
        },
      },
      Open: {
        entry: "Console log",
        initial: "Idle",
        states: {
          Idle: {
            on: {
              "Username Changed": {
                target: "Submitting",
              },
            },
          },
          Submitting: {
            invoke: {
              src: "Submit username to backend",
              onDone: [
                {
                  target: "Complete",
                },
              ],
              onError: [
                {
                  target: "Errored",
                },
              ],
            },
          },
          Complete: {},
          Errored: {
            on: {
              "Username Changed": {
                target: "Submitting",
              },
            },
          },
        },
      },
    },
  },
  {
    actions: {},
    services: {
      "Submit username to backend": () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(undefined);
          }, 1000);
        });
      },
    },
  }
);

/**
 * Runs the machine and shows it on screen
 */
const actor = interpret(machine).start();

actor.subscribe((state) => {
  app.innerHTML = `
    <pre>${JSON.stringify(state.value)}</pre>
    <pre>${JSON.stringify(state.context, null, 2)}</pre>
  `;
});

window.addEventListener("keydown", () => {
  actor.send("Display Modal");
});

console.log(actor.getSnapshot());
