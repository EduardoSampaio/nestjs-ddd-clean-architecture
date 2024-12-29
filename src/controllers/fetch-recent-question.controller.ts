import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { PrismaService } from 'src/prisma/prisma.service';
import { z } from 'zod';

const pageQueryParamSchema = z
    .string()
    .optional()
    .default('1')
    .transform(Number)
    .pipe(z.number().min(1));

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema);

type PageQUeryParamSchema = z.infer<typeof pageQueryParamSchema>;

@Controller('/questions')
@UseGuards(AuthGuard('jwt'))
export class FetchRecentQuestionController {
    constructor(private prisma: PrismaService) {}

    @Get()
    async handle(
        @Query('page', queryValidationPipe) page: PageQUeryParamSchema,
    ) {
        const questions = await this.prisma.question.findMany({
            take: 1,
            skip: (page - 1) * 20,
            orderBy: { createdAt: 'desc' },
        });
        return questions;
    }
}
