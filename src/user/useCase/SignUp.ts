import { HttpReturn } from "../../infra/http/httpReturn";
import { Jwt } from "../../utils/jwt";
import { User } from "../domain/user";
import { UserInput } from "../dtos/user";
import { UserRepos } from "../repos/userRepos";

export class SignUp {
  repos: UserRepos;
  constructor(repos: UserRepos) {
    this.repos = repos;
  }
  async execute(userData: UserInput) {
    const userExist = await this.repos.findByEmail(userData.email);
    if (userExist) {
      return HttpReturn.badRequest("This email in use");
    }
    try {
      const user = new User(
        userData.name,
        userData.email,
        userData.password
      ).getValue();
      await this.repos.save(user);
      const token = Jwt.create(user.name, user.email);

      return HttpReturn.ok(token);
    } catch (error: any) {
      return HttpReturn.badRequest(error.message);
    }
  }
}
