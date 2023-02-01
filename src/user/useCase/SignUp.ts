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
      const userSave = await this.repos.save(user);
      const token = Jwt.create(userSave.name, userSave.email, userSave.id);

      return HttpReturn.ok<string>(token);
    } catch (error: any) {
      return HttpReturn.badRequest(error.message);
    }
  }
}
