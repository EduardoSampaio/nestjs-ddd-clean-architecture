import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from 'src/prisma/prisma.service';
import { CurrentUser } from 'src/auth/current-user-decorator';
import { UserPayload } from 'src/auth/jwt.strategy';
import { z } from 'zod';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';

const createQuestionBodySchema = z.object({
    title: z.string(),
    content: z.string(),
    slug: z.string(),
    author_id: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema);

type CreateQuestionBody = z.infer<typeof createQuestionBodySchema>;

@Controller('/questions')
@UseGuards(AuthGuard('jwt'))
export class CreateQuestionController {
    constructor(private prisma: PrismaService) {}

    @Post()
    async handle(
        @Body(bodyValidationPipe) body: CreateQuestionBody,
        @CurrentUser() user: UserPayload,
    ) {
        const { title, content } = body;

        await this.prisma.question.create({
            data: { title, content, slug: 'dasdas', authorId: user.sub },
        });
    }
}
