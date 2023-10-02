import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateCarDto {
  @IsString()
  readonly brand: string;

  @IsString()
  readonly model: string;

  @IsNumber()
  @IsPositive()
  readonly price: number;

  @IsOptional()
  @IsString()
  readonly year: string;
}
