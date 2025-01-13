import { IsArray, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";

export class CreateReviewDto {

    @IsString()
    @MinLength(5)
    title: string;

    @IsString()
    @MinLength(5)
    @MaxLength(150)
    content: string;

    @IsUUID()
    restaurandId: string;

    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    images?: string[];

}
