import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';
import { randomUUID } from 'crypto';
import 'dotenv/config';

const prisma = new PrismaClient();
const schemaId = randomUUID();

function generateUniqueDatabaseUrl() {
    if (!process.env.DATABASE_URL) {
        throw new Error('Please provide a DATABASE_URL environment variable');
    }

    const url = new URL(process.env.DATABASE_URL);

    url.searchParams.set('schema', schemaId);

    return url.toString();
}

beforeAll(async () => {
    const databaseUrl = generateUniqueDatabaseUrl();

    process.env.DATABASE_URL = databaseUrl;

    execSync('npx prisma migrate deploy', {
        env: {
            DATABASE_URL: databaseUrl,
        },
    });
    await prisma.$connect();
});

afterAll(async () => {
    await prisma.$executeRawUnsafe(
        `DROP SCHEMA IF EXISTS "${schemaId}" CASCADE;`,
    );
    await prisma.$disconnect();
});
