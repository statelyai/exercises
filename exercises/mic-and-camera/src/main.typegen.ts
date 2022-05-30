// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    assignStreamToContext: "STREAM_STARTED";
    cancelMediaStream: "xstate.init";
  };
  internalEvents: {
    "xstate.after(2000)#(machine).gettingDevicesFailed": {
      type: "xstate.after(2000)#(machine).gettingDevicesFailed";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    getUserDevices: "done.invoke.(machine).gettingUserDevices:invocation[0]";
  };
  missingImplementations: {
    actions: "assignStreamToContext" | "cancelMediaStream";
    services: "getUserDevices";
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    getUserDevices: "xstate.after(2000)#(machine).gettingDevicesFailed";
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | "gettingUserDevices"
    | "streamRunning"
    | "gettingDevicesFailed";
  tags: never;
}
