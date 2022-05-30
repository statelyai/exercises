import { createMachine, interpret } from "xstate";
import { waitFor } from "xstate/lib/waitFor";

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda";

const handlerMachine = createMachine(
  {
    tsTypes: {} as import("./main.typegen").Typegen0,
    context: {
      name: "",
    },
    schema: {
      services: {
        getUser: {
          data: {} as {},
        },
      },
    },
    id: "Handler machine",
    initial: "gettingUser",
    states: {
      gettingUser: {
        invoke: {
          src: "getUser",
          onDone: [
            {
              target: "User found",
            },
          ],
          onError: [
            {
              target: "Not found",
            },
          ],
        },
      },
      "User found": {
        type: "final",
      },
      "Not found": {
        type: "final",
      },
    },
  },
  {
    services: {
      getUser: async (context) => {
        if (context.name !== "mattpocock") {
          throw new Error("User not found");
        }
        return Promise.resolve({});
      },
    },
  },
);

export const lambdaHandler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const actor = interpret(
    handlerMachine.withContext({
      name: event.queryStringParameters.name,
    }),
  ).start();

  const finalState = await waitFor(
    actor,
    (state) => state.done,
  );

  if (finalState.matches("User found")) {
    return {
      statusCode: 200,
      body: `Found!`,
    };
  }
  if (finalState.matches("Not found")) {
    return {
      statusCode: 404,
      body: "Not found",
    };
  }
  return {
    statusCode: 500,
    body: "Internal error",
  };
};
