import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env';
import { AuthModule } from './auth/auth.module';
import { CreateAccountController } from './controllers/create-account.controller';
import { CreateQuestionController } from './controllers/create-question.controller';
import { AuthenticateController } from './controllers/authenticate.controller';
import { FetchRecentQuestionController } from './controllers/fetch-recent-question.controller';

@Module({
    imports: [
        ConfigModule.forRoot({
            validate: (env) => envSchema.parse(env),
            isGlobal: true,
        }),
        AuthModule,
    ],
    controllers: [
        CreateAccountController,
        CreateQuestionController,
        AuthenticateController,
        FetchRecentQuestionController,
    ],
    providers: [PrismaService],
})
export class AppModule {}
