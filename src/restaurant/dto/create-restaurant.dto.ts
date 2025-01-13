import { IsArray, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateRestaurantDto {
    
    @IsString()
    @MinLength(1)
    @MaxLength(50)
    name: string;
    
    @IsString()
    @MinLength(10)
    @MaxLength(150)
    description: string;

    @IsOptional()
    @IsArray()
    images?: string[];
    
}
