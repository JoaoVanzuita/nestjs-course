import { Body, Controller, Get, HttpException, Param, ParseBoolPipe, Post, Query, UseGuards } from '@nestjs/common'
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto'
import { AuthGuard } from 'src/users/guards/auth/auth.guard'
import { ValidateCreateUserPipe } from 'src/users/pipes/validate-create-user/validate-create-user.pipe'
import { UsersService } from 'src/users/services/users/users.service'

@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) { }

  @Get()
  @UseGuards(AuthGuard)
  async getUsers() {
    return this.usersService.getAllUsers()
  }

  @Get('posts')
  async getUsersPosts() {
    return [
      {
        userName: 'Teste da Silva',
        email: 'teste@silva.com',
        posts: [
          {
            id: 1, title: 'post teste 1'
          },
          {
            id: 2, title: 'post teste 2'
          }
        ]
      }
    ]
  }

  @Get('posts/comments')
  async getPostsComments() {
    return [
      {
        id: 1,
        title: 'post teste 1',
        comments: []
      }
    ]
  }

  @Get(':idUser')
  async getUserById(@Param('idUser') idUser: string) {

    const user = await this.usersService.findUserById(idUser)

    if (!user) {
      throw new HttpException('User not found', 404)
    }

    return user
  }

  @Get(':idUser/post/:idPost')
  async getPostAndUserById(@Param('idUser') idUser: string, @Param('idPost') idPost: string) {
    console.log(idUser)
    console.log(idPost)

    return {
      user: idUser,
      post: idPost
    }
  }

  @Get(':idUser/posts')
  async getPostsByTitle(@Param('idUser') idUser: string, @Query('sort', ParseBoolPipe) sort: boolean) {
    console.log(sort)
  }

  @Post()
  async createUser(@Body(ValidateCreateUserPipe) createUserData: CreateUserDto) {

    const newUser = this.usersService.createUser(createUserData)

    return newUser
  }

}
