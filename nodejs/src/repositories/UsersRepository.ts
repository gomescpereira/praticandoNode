import { Repository, EntityRepository } from "typeorm";
import { User } from "../entity/User";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {

}


