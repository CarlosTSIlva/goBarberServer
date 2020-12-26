import User from '../infra/typeorm/entities/Users';
import IcreateUserDto from '../dtos/ICreateUserDTO';
import IFindAllProvidersDto from '@modules/users/dtos/IFindAllProvidersDto';

export default interface IUsersRepository {
  findAllProviders(data: IFindAllProvidersDto): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: IcreateUserDto): Promise<User>;
  save(user: User): Promise<User>;
}
