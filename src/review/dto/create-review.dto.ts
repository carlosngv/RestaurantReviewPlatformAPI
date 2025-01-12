import { IsArray, IsOptional, IsString } from "class-validator";

export class CreateReviewDto {

    @IsString()
    title: string;

    @IsString()
    content: string;

    @IsArray()
    @IsOptional()
    images?: string[];

}
