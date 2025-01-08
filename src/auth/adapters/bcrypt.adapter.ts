import * as bcrypt from 'bcrypt'

export class BcryptAdapter {

    static hashPassword( password: string ): string {
        return bcrypt.hashSync( password, 10 );
    }

    static compareHash( password: string, hashedPassword: string ): boolean {
        return bcrypt.compareSync( password, hashedPassword );
    }

}