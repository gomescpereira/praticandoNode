import { User } from '../../entities/user.entity';
import { UpdateUserDto } from '../../dto/update-user.dto';

export default class TestUtil {

  static giveMeValidUser(): User {
      const user = new User();
      user.name = 'Carlos Edaurdo';
      user.email = 'gomes@gmail.cvom';
      user.password_hash = '12345678';
      user.id = "1";
      return user;
  }

 static giveMeValidUpdateUser(): UpdateUserDto {
      const user = new UpdateUserDto();
      user.name = 'Nome Atualizado';
      user.email = 'gomes@gmail.cvom';
      user.password_hash = '12345678';
      return user;
  }

}
