import { Injectable } from '@nestjs/common'
import { TCreateUser, TUserData } from 'src/users/utils/types'
import { v4 as uuid } from 'uuid'

@Injectable()
export class UsersService {

  private inMemoryDBUsers: TUserData[] = [
    { id: uuid(), username: 'Teste da Silva', email: 'teste@silva.com' },
    { id: uuid(), username: 'Teste Dois da Silva', email: 'testedois@silva.com' }
  ]

  async createUser(createUserData: TCreateUser) {
    const newUser = {
      id: uuid(),
      ...createUserData
    }

    return this.inMemoryDBUsers.push(newUser)
  }

  async getAllUsers() {
    return this.inMemoryDBUsers
  }

  async findUserById(idUser: string) {
    return this.inMemoryDBUsers.find(user => user.id === idUser)
  }

}
