import { IsString, MinLength } from "class-validator";

export class LoginUserDto {
    @IsString()
    @MinLength(6)
    username: string;

    @IsString()
    password: string;
}
