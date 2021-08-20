import { factory } from 'factory-girl';
import { User } from '../src/entity/User';
import faker from 'faker';

factory.define("User", User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  passord: "123126"
});


export default factory;
