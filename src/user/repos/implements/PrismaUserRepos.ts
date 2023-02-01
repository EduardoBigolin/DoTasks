import { UserRepos } from "../userRepos";
import { PrismaClient, User, User as UserPrisma } from "@prisma/client";
import { UserInput } from "../../dtos/user";

const prisma = new PrismaClient();

export class PrismaUserRepos implements UserRepos {
  async findByEmail(email: string): Promise<UserPrisma | null> {
    return await prisma.user.findFirst({
      where: {
        email,
      },
    });
  }
  async save(input: UserInput): Promise<User> {
    return await prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        password: input.password,
      },
    });
  }
}
