import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            global: true,
            useFactory: (configService: ConfigService) => {
                const privateKey = configService.get('JWT_PRIVATE_KEY');
                const puliblicKey = configService.get('JWT_PUBLIC_KEY');

                return {
                    signOptions: {
                        algorithm: 'RS256',
                        expiresIn: '1d',
                    },
                    privateKey: Buffer.from(privateKey, 'base64'),
                    publicKey: Buffer.from(puliblicKey, 'base64'),
                };
            },
        }),
    ],
    providers: [JwtStrategy],
})
export class AuthModule {}
