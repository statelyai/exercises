import { APIGatewayProxyEvent } from "aws-lambda";
import { describe, it, expect } from "vitest";
import { lambdaHandler } from "../main";

describe("lambdaHandler", () => {
  it("Should return 200 if the name is mattpocock", async () => {
    const result = await lambdaHandler({
      queryStringParameters: {
        name: "mattpocock",
      },
    } as any);

    expect(result.statusCode).toBe(200);
  });

  it("Should return 404 if the name is mattpeacock", async () => {
    const result = await lambdaHandler({
      queryStringParameters: {
        name: "mattpeacock",
      },
    } as any);

    expect(result.statusCode).toBe(404);
  });
});
