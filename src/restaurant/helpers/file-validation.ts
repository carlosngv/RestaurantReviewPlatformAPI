import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { v4 } from "uuid";

@Injectable()
export class FileValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        const validExtensions = ['png', 'jpg', 'jpeg'];

        console.log('File from pipe: ', value)
        const { mimetype } = value;
        
        if( !mimetype )
            throw new BadRequestException('Not valid image');
        
        const extension = mimetype.split('/').at(1);

        if( !validExtensions.includes( extension ))
            throw new BadRequestException(`Files with .${extension} are invalid. Valid extensions: [${validExtensions}]`);
    

        return value;
    }

}