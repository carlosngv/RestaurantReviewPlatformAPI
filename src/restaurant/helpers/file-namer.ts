import { v4 } from 'uuid'

export const fileNamer = (req: Express.Request, file: Express.Multer.File, cb ) => {
    console.log('File form filenamer: ', file);
    if( !file )
        cb( false, `File does not exists`);

    cb(null, `${v4()}.${ file.mimetype.split('/').at(1)}`);
}