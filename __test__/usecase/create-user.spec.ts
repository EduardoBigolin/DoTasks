import { faker } from "@faker-js/faker";
import { describe, it, expect } from "vitest";
import { PrismaUserRepos } from "../../src/user/repos/implements/PrismaUserRepos";
import { SignUp } from "../../src/user/useCase/SignUp";
import { Jwt } from "../../src/utils/jwt";

describe("sign up", () => {
  const repos = new PrismaUserRepos();
  it("test if return a new user in db if email and password is valid", async () => {
    const randomName = faker.name.firstName();
    const randomEmail = faker.internet.email(randomName);
    const randomPassword = faker.internet.password(
      14,
      true,
      /^[a-zA-Z]\w{3,14}$/
    );
    await new SignUp(repos).execute({
      name: randomName,
      email: randomEmail,
      password: randomPassword,
    });
    const result = await repos.findByEmail(randomEmail);
    expect(result?.name).toBe(randomName);
  });
  it("test if return a JWT token with email and password is valid", async () => {
    const randomName = faker.name.firstName();
    const randomEmail = faker.internet.email(randomName);
    const randomPassword = faker.internet.password(
      14,
      true,
      /^[a-zA-Z]\w{3,14}$/
    );
    const token = await new SignUp(repos).execute({
      name: randomName,
      email: randomEmail,
      password: randomPassword,
    });
    const tokenValid = Jwt.verify(token.message);
    expect(tokenValid.email).toBe(randomEmail);
  });

  it("test if return error if email in use", async () => {
    const randomName = faker.name.firstName();
    const randomEmail = faker.internet.email(randomName);
    const randomPassword = faker.internet.password(
      14,
      true,
      /^[a-zA-Z]\w{3,14}$/
    );

    await new SignUp(repos).execute({
      name: randomName,
      email: randomEmail,
      password: randomPassword,
    });
    const result = await new SignUp(repos).execute({
      name: randomName,
      email: randomEmail,
      password: randomPassword,
    });

    expect(result.message).toBe("This email in use");
  });
  it("test if return error if password is invalid", async () => {
    const randomName = faker.name.firstName();
    const randomEmail = faker.internet.email(randomName);
    const randomPassword = "1";

    await new SignUp(repos).execute({
      name: randomName,
      email: randomEmail,
      password: randomPassword,
    });
    const result = await new SignUp(repos).execute({
      name: randomName,
      email: randomEmail,
      password: randomPassword,
    });

    expect(result.message).toBe("Invalid password");
  });
  it("test if return error if name is invalid", async () => {
    const randomName = "1";
    const randomEmail = faker.internet.email();
    const randomPassword = faker.internet.password(
      14,
      true,
      /^[a-zA-Z]\w{3,14}$/
    );

    await new SignUp(repos).execute({
      name: randomName,
      email: randomEmail,
      password: randomPassword,
    });
    const result = await new SignUp(repos).execute({
      name: randomName,
      email: randomEmail,
      password: randomPassword,
    });

    expect(result.message).toBe("Invalid name");
  });
  it("test if return error if email is invalid", async () => {
    const randomName = faker.name.firstName();
    const randomEmail = "INVALID";
    const randomPassword = faker.internet.password(
      14,
      true,
      /^[a-zA-Z]\w{3,14}$/
    );

    await new SignUp(repos).execute({
      name: randomName,
      email: randomEmail,
      password: randomPassword,
    });
    const result = await new SignUp(repos).execute({
      name: randomName,
      email: randomEmail,
      password: randomPassword,
    });

    expect(result.message).toBe("Invalid email");
  });
});
