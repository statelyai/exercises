import { describe, expect, it } from "vitest";
import { lambdaHandler } from "../main";

describe("lambdaHandler", () => {
  it("Should return 500", async () => {
    const result = await lambdaHandler({
      queryStringParameters: {
        name: "name",
      },
    } as any);

    expect(result.statusCode).toBe(500);
  });
});
