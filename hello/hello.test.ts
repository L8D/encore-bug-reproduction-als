import { beforeAll, describe, expect, test } from "vitest";
import { get } from "./hello";
import { hello } from "~encore/clients";
import { AsyncLocalStorage } from "node:async_hooks";

const als = new AsyncLocalStorage<{ foo: string }>()

beforeAll(async () => {
  als.enterWith({ foo: 'bar' })
  const store = als.getStore()

  if (store == null) {
    throw new Error('missing store')
  }

  await hello.get({ name: "world" })
})

describe("get", () => {
  test("should fail when calling the function directly", async () => {
    expect(get({ name: "world" })).rejects.toThrow('missing req')
  });

  test("should work when using the api client", async () => {
    const resp = await hello.get({ name: "world" });
    expect(resp.message).toBe("Hello world!");
  });
});
