import { ConnectionOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

const {
    DATABASE_TYPE,
    DATABASE_NAME,
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
    DATABASE_SYNCRONIZED,
    DATABASE_MIGRATION_TABLE_NAME,
} = process.env;

export const config: ConnectionOptions = {
    name: 'default',
    type: DATABASE_TYPE as any,
    host: DATABASE_HOST,
    port: Number(DATABASE_PORT),
    database: DATABASE_NAME,
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    synchronize: Boolean(DATABASE_SYNCRONIZED),
    migrationsTableName: DATABASE_MIGRATION_TABLE_NAME,
    entities: [`${__dirname}/components/**/entities/*.entity{.ts,.js}`],
    migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
    // We are using migrations, synchronize should be set to false.

    // Run migrations automatically,
    // you can disable this if you prefer running migration manually.
    // migrationsRun: true,
    // logging: true,
    // logger: 'file',

    // Allow both start:prod and start:dev to use migrations
    // __dirname is either dist or src folder, meaning either
    // the compiled js in prod or the ts in dev.
    cli: {
        migrationsDir: 'src/migrations',
        entitiesDir: 'src/components/**/entities/',
    },
};
