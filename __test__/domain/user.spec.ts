import { describe, expect, it } from "vitest";
import { faker } from "@faker-js/faker";
import { User } from "../../src/user/domain/user";

describe("Domain", () => {
  it("test if return a new instance of user if name, email and password is valid", () => {
    const randomName = faker.name.fullName();
    const randomEmail = faker.internet.email(randomName);
    const randomPassword = faker.internet.password(
      14,
      true,
      /^[a-zA-Z]\w{3,14}$/
    );

    const user = new User(randomName, randomEmail, randomPassword).getValue();

    expect(user.name).toBe(randomName);
  });
  it("test if return a error if password is invalid", () => {
    const randomName = faker.name.fullName();
    const randomEmail = faker.internet.email(randomName);
    const randomPassword = "123";

    expect(() =>
      new User(randomName, randomEmail, randomPassword).getValue()
    ).toThrow("Invalid password");
  });

  it("test if return a error if password is null", () => {
    const randomName = faker.name.fullName();
    const randomEmail = faker.internet.email(randomName);
    const randomPassword = null as any;

    expect(() =>
      new User(randomName, randomEmail, randomPassword).getValue()
    ).toThrow("Password is required");
  });

  it("test if return a error if email is invalid", () => {
    const randomName = faker.name.fullName();
    const randomEmail = "INVALID";
    const randomPassword = faker.internet.password(
      14,
      true,
      /^[a-zA-Z]\w{3,14}$/
    );

    expect(() =>
      new User(randomName, randomEmail, randomPassword).getValue()
    ).toThrow("Invalid email");
  });

  it("test if return a error if email is null", () => {
    const randomName = faker.name.fullName();
    const randomEmail = null as any;
    const randomPassword = faker.internet.password(
      14,
      true,
      /^[a-zA-Z]\w{3,14}$/
    );

    expect(() =>
      new User(randomName, randomEmail, randomPassword).getValue()
    ).toThrow("Email is required");
  });
  it("test if return a error if name is invalid", () => {
    const randomName = "1";
    const randomEmail = faker.internet.email(randomName);
    const randomPassword = faker.internet.password(
      14,
      true,
      /^[a-zA-Z]\w{3,14}$/
    );

    expect(() =>
      new User(randomName, randomEmail, randomPassword).getValue()
    ).toThrow("Invalid name");
  });

  it("test if return a error if name is null", () => {
    const randomName = null as any;
    const randomEmail = faker.internet.email(randomName);
    const randomPassword = faker.internet.password();

    expect(() =>
      new User(randomName, randomEmail, randomPassword).getValue()
    ).toThrow("Name is required");
  });
});
