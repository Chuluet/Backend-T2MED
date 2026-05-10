import { IsEmail, IsString, IsOptional, MinLength, Matches, MaxLength } from 'class-validator';

export class User {
  uid!: string;

  @IsString()
  @MaxLength(50)
  name!: string;

  @IsString()
  @MaxLength(50)
  lastName!: string;

  @IsEmail({}, { message: 'El formato del correo no es válido' })
  email!: string;

  @MinLength(8, { message: 'Mínimo 8 caracteres' })
  @Matches(/[A-Z]/, { message: 'Debe contener al menos una mayúscula' })
  @Matches(/[0-9]/, { message: 'Debe contener al menos un número' })
  password!: string;

  @Matches(/^\+[1-9]\d{0,2}\d{10}$/, { message: 'Número con prefijo internacional' })
  phone!: string;

  @IsOptional()
  @Matches(/^\+[1-9]\d{0,2}\d{10}$/, { message: 'Teléfono de emergencia con prefijo internacional' })
  emergencyPhone?: string | null;

  fcmToken?: string | null;
  createdAt?: any;
  updatedAt?: any;
}