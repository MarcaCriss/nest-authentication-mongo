import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsString({ message: 'El nombre debe ser un string' })
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsString({ message: 'El apellido debe ser un string' })
  @MaxLength(255)
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener como minimo 8 carateres' })
  @MaxLength(128)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password to weak',
  })
  password: string;

  @IsArray()
  role: string[];
}
