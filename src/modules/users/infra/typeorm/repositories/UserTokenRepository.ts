import { getRepository, Repository } from 'typeorm';

import IUsersTokenRepository from '@modules/users/repositories/IUsersTokenRepository';

import UserToken from '../entities/UserToken';

class UsersTokenRepository implements IUsersTokenRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({ where: { token } });

    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      user_id,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }
}

export default UsersTokenRepository;
