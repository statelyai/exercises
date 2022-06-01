import { createMachine, interpret } from "xstate";
import { waitFor } from "xstate/lib/waitFor";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

const handlerMachine = createMachine({});

export const lambdaHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const actor = interpret(
    handlerMachine.withContext({
      name: event.queryStringParameters.name,
    })
  ).start();

  const finalState = await waitFor(actor, (state) => state.done);

  if (finalState.matches("success")) {
    return {
      statusCode: 200,
      body: `Success`,
    };
  }
  return {
    statusCode: 500,
    body: "Internal error",
  };
};
