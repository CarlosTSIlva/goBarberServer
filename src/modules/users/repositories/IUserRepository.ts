import User from '../infra/typeorm/entities/Users';
import IcreateUserDto from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: IcreateUserDto): Promise<User>;
  save(user: User): Promise<User>;
}
