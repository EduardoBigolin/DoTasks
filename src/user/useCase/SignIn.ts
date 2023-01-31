import { HttpReturn } from "../../infra/http/httpReturn";
import { Hash } from "../../utils/hash";
import { Jwt } from "../../utils/jwt";
import { UserLoginInput } from "../dtos/user";
import { UserRepos } from "../repos/userRepos";

export class SignIn {
  repos: UserRepos;
  constructor(repos: UserRepos) {
    this.repos = repos;
  }

  async execute(userLogin: UserLoginInput) {
    const user = await this.repos.findByEmail(userLogin.email);
    if (!user) {
      return HttpReturn.badRequest("User not found");
    }
    const comparePassword = Hash.compare(userLogin.password, user.password);
    if (!comparePassword) {
      return HttpReturn.badRequest("Invalid credential");
    }
    const token = Jwt.create(user.name, user.email);

    return HttpReturn.ok(token);
  }
}
