import { describe, expect, it } from "vitest";
import { lambdaHandler } from "../main";

describe("lambdaHandler", () => {
  it("Should return 500", async () => {
    const result = await lambdaHandler({} as any);

    expect(result.statusCode).toBe(500);
  });
});
