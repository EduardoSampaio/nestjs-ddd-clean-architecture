import {
    Body,
    Controller,
    Post,
    UnauthorizedException,
    UsePipes,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { PrismaService } from 'src/prisma/prisma.service';
import { z } from 'zod';

const bodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

type AuthenticateBodySchema = z.infer<typeof bodySchema>;

@Controller('/session')
@UsePipes(new ZodValidationPipe(bodySchema))
export class AuthenticateController {
    constructor(
        private jwt: JwtService,
        private prisma: PrismaService,
    ) {}

    @Post()
    async handle(@Body() body: AuthenticateBodySchema) {
        const { email, password } = body;

        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new UnauthorizedException('User credentials do not match');
        }

        const isPasswordValid = await compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('User credentials do not match');
        }

        const token = this.jwt.sign({ sub: user.id });

        return { token };
    }
}
