import { IsArray, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateReviewDto {

    @IsString()
    @MinLength(5)
    @IsOptional()
    title?: string;

    @IsString()
    @MinLength(5)
    @MaxLength(150)
    @IsOptional()
    content?: string;


    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    images?: string[]

}
