import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";
import { Task } from "../../../src/task/domain/taskt";
import { PrismaTaskRepos } from "../../../src/task/repos/implements/PrismaTaskRepos";
import { CreateTask } from "../../../src/task/usecase/create-task";
import { PrismaUserRepos } from "../../../src/user/repos/implements/PrismaUserRepos";
import { SignIn } from "../../../src/user/useCase/SignIn";
import { SignUp } from "../../../src/user/useCase/SignUp";
import { Jwt } from "../../../src/utils/jwt";

describe("Use case Tasks", async () => {
  const UserRepos = new PrismaUserRepos();
  const randomName = faker.name.firstName();
  const randomEmail = faker.internet.email(randomName);
  const randomPassword = faker.internet.password(
    14,
    true,
    /^[a-zA-Z]\w{3,14}$/
  );
  await new SignUp(UserRepos).execute({
    name: randomName,
    email: randomEmail,
    password: randomPassword,
  });
  it("test if return a new task in data base if title and description is valid", async () => {
    const token = await new SignIn(UserRepos).execute({
      email: randomEmail,
      password: randomPassword,
    });
    const decode = Jwt.verify(token.message);

    const reposTask = new PrismaTaskRepos();
    const randomTitle = faker.word.adverb();
    const description = faker.lorem.words(30);
    const task = new Task(
      randomTitle,
      description,
      decode.userID as number
    ).getValue();
    await new CreateTask(reposTask).execute(task);
    const tasks = await reposTask.findAllTaskByUser(decode.userID as number);
    expect(tasks[0]).toBeTruthy();
  });

  it("test if return a error if title is invalid", async () => {
    const token = await new SignIn(UserRepos).execute({
      email: randomEmail,
      password: randomPassword,
    });
    const reposTask = new PrismaTaskRepos();
    const randomTitle = "1";
    const description = faker.lorem.words(30);
    const decode = Jwt.verify(token.message);

    const task = {
      title: randomTitle,
      description: description,
      userId: decode.userID,
    };

    const result = await new CreateTask(reposTask).execute(task);
    expect(result.message).toBe("Invalid title");
  });

  it("test if return a error if description is invalid", async () => {
    const token = await new SignIn(UserRepos).execute({
      email: randomEmail,
      password: randomPassword,
    });
    const reposTask = new PrismaTaskRepos();
    const randomTitle = faker.lorem.word();
    const description = "1";
    const decode = Jwt.verify(token.message);

    const task = {
      title: randomTitle,
      description: description,
      userId: decode.userID,
    };

    const result = await new CreateTask(reposTask).execute(task);
    expect(result.message).toBe("Invalid description");
  });
});
