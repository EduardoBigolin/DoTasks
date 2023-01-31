import { faker } from "@faker-js/faker";
import { describe, it, expect } from "vitest";
import { PrismaUserRepos } from "../../src/user/repos/implements/PrismaUserRepos";
import { SignIn } from "../../src/user/useCase/SignIn";
import { SignUp } from "../../src/user/useCase/SignUp";
import { Jwt } from "../../src/utils/jwt";

describe("sign in", () => {
  const repos = new PrismaUserRepos();
  it("test if return a token with email and password is valid", async () => {
    const randomName = faker.name.firstName();
    const randomEmail = faker.internet.email(randomName);
    const randomPassword = faker.internet.password(
      14,
      true,
      /^[a-zA-Z]\w{3,14}$/
    );
    const input = {
      email: randomEmail,
      password: randomPassword,
    };
    await new SignUp(repos).execute({
      name: randomName,
      email: randomEmail,
      password: randomPassword,
    });
    const token = await new SignIn(repos).execute(input);

    console.log(token);

    const verify = Jwt.verify(token.message);

    expect(verify.name).toBe(randomName);
  });

  it("test if return a error with password is invalid", async () => {
    const randomName = faker.name.firstName();
    const randomEmail = faker.internet.email(randomName);
    const randomPassword = faker.internet.password(
      14,
      true,
      /^[a-zA-Z]\w{3,14}$/
    );
    const input = {
      email: randomEmail,
      password: randomPassword,
    };
    await new SignUp(repos).execute({
      name: randomName,
      email: randomEmail,
      password: randomPassword,
    });
    const token = await new SignIn(repos).execute(input);

    console.log(token);

    const verify = Jwt.verify(token.message);

    expect(verify.name).toBe(randomName);
  });

  it("test if return a error with email is invalid", async () => {
    const randomName = faker.name.firstName();
    const randomEmail = faker.internet.email(randomName);
    const randomPassword = faker.internet.password(
      14,
      true,
      /^[a-zA-Z]\w{3,14}$/
    );
    const input = {
      email: randomEmail,
      password: randomPassword,
    };

    const result = await new SignIn(repos).execute(input);

    expect(result.message).toBe("User not found");
  });
});
