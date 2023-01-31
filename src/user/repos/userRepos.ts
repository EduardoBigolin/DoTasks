import { User as UserPrisma } from "@prisma/client";
import { UserInput } from "../dtos/user";

export interface UserRepos {
  save(input: UserInput): Promise<void>;
  findByEmail(email: string): Promise<UserPrisma | null>;
}
