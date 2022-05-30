import { assign, createMachine, interpret } from "xstate";

const app = document.querySelector<HTMLDivElement>("#app")!;

const machine = createMachine({
  initial: "gettingUserDevices",
  tsTypes: {} as import("./main.typegen").Typegen0,
  context: {},
  schema: {
    context: {} as {
      stream?: MediaStream;
    },
    events: {} as
      | {
          type: "GETTING_DEVICES_FAILED";
        }
      | {
          type: "STREAM_STARTED";
          stream: MediaStream;
        },
  },
  states: {
    gettingUserDevices: {
      on: {
        GETTING_DEVICES_FAILED: "gettingDevicesFailed",
        STREAM_STARTED: {
          actions: "assignStreamToContext",
          target: "streamRunning",
        },
      },
      invoke: {
        src: "getUserDevices",
      },
    },
    streamRunning: {
      exit: "cancelMediaStream",
    },
    gettingDevicesFailed: {
      after: {
        2000: "gettingUserDevices",
      },
    },
  },
}).withConfig({
  actions: {
    cancelMediaStream: (context) => {
      if (context.stream) {
        context.stream.getTracks().forEach((track) => track.stop());
      }
    },
    assignStreamToContext: assign((_context, event) => {
      return {
        stream: event.stream,
      };
    }),
  },
  services: {
    getUserDevices: () => (sendBack) => {
      let shouldCleanup = false;
      navigator.mediaDevices
        .getUserMedia({
          video: true,
        })
        .then((stream) => {
          if (shouldCleanup) {
            stream.getTracks().forEach((track) => track.stop());
          } else {
            sendBack({
              type: "STREAM_STARTED",
              stream,
            });
          }
        })
        .catch((e) => {
          console.error(e);
          sendBack("GETTING_DEVICES_FAILED");
        });

      return () => {
        shouldCleanup = true;
      };
    },
  },
});

interpret(machine)
  .start()
  .subscribe((state) => {
    if (state.matches("streamRunning") && state.context.stream) {
      app.innerHTML = `
        <video id="stream"></video>
      `;
      const video = document.querySelector<HTMLVideoElement>("#stream")!;

      video.srcObject = state.context.stream;
      video.autoplay = true;
    } else {
      app.innerHTML = `
        <code>${state.value}</code>
        <pre>${JSON.stringify(state.context, null, 2)}</pre>
      `;
    }
  });
