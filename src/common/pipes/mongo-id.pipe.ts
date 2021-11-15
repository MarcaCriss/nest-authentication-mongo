import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isMongoId } from 'class-validator';

@Injectable()
export class MongoIdPipe implements PipeTransform {
  transform(value: any) {
    if (!isMongoId(value))
      throw new BadRequestException(`${value} no es un mongoId valido`);
    return value;
  }
}
