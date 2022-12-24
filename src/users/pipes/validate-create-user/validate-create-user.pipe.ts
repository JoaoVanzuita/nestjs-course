import { ArgumentMetadata, HttpException, Injectable, PipeTransform } from '@nestjs/common'
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto'

@Injectable()
export class ValidateCreateUserPipe implements PipeTransform {
  transform(value: CreateUserDto, metadata: ArgumentMetadata) {

    const parsedAge = parseInt(value.age.toString())

    if(isNaN(parsedAge)){
      throw new HttpException('Invalid type for age', 400)
    }

    return {...value, age: parsedAge}
  }
}
