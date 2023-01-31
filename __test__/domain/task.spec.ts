import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";
import { Task } from "../../src/task/domain/taskt";

describe("Domain Tasks", () => {
  it("test if return a new instance of task if title and description is valid", () => {
    const randomTitle = faker.word.adverb();
    const description = faker.lorem.words(30);

    const task = new Task(randomTitle, description).getValue();

    expect(task.title).toBe(randomTitle);
  });

  it("test if return a error if title is invalid", () => {
    const randomTitle = "1";
    const description = faker.lorem.words(30);

    expect(() => new Task(randomTitle, description).getValue()).toThrow(
      "Invalid title"
    );
  });

  it("test if return a error if title is invalid", () => {
    const randomTitle = faker.word.adverb();
    const description = "1";

    expect(() => new Task(randomTitle, description).getValue()).toThrow(
      "Invalid description"
    );
  });
  it("test if return a error if title is null", () => {
    const randomTitle = null as any;
    const description = faker.lorem.words(30);

    expect(() => new Task(randomTitle, description).getValue()).toThrow(
      "title is required"
    );
  });
  it("test if return a error if title is null", () => {
    const randomTitle = faker.word.adverb();
    const description = null as any;

    expect(() => new Task(randomTitle, description).getValue()).toThrow(
      "description is required"
    );
  });
});
