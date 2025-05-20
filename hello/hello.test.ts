import { beforeAll, describe, expect, test } from "vitest";
import { get } from "./hello";
import { AsyncLocalStorage } from "node:async_hooks";

const als = new AsyncLocalStorage<{ foo: string }>()

beforeAll(() => {
  als.enterWith({ foo: 'bar' })
  const store = als.getStore()

  if (store == null) {
    throw new Error('missing store')
  }
})

describe("get", () => {
  test("should combine string with parameter value", async () => {
    const resp = await get({ name: "world" });
    expect(resp.message).toBe("Hello world!");
  });
});
