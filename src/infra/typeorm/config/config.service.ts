/* eslint-disable @typescript-eslint/no-var-requires */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

require('dotenv').config();

class ConfigService {
  constructor(private env: { [key: string]: string | undefined }) {}

  private getEnv(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }
    return value;
  }

  public ensureEnvs(keys: string[]): this {
    keys.forEach((key) => this.getEnv(key, true));
    return this;
  }

  public getPort(): string {
    return this.getEnv('PORT', true);
  }

  public isProduction(): boolean {
    const mode = this.getEnv('NODE_ENV', false);
    return mode !== 'development';
  }
  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.getEnv('POSTGRES_HOST'),
      port: parseInt(this.getEnv('POSTGRES_PORT'), 0),
      username: this.getEnv('POSTGRES_USER'),
      password: this.getEnv('POSTGRES_PASSWORD'),
      database: this.getEnv('POSTGRES_DATABASE'),
      synchronize: false,
      migrationsRun: true,
      cache: true,
      logging: JSON.parse(this.getEnv('LOGGING')),
      autoLoadEntities: true,
      migrationsTableName: 'migrations',
      cli: {
        migrationsDir: 'src/infra/typeorm/migrations',
      },
      retryAttempts: 3,
      retryDelay: 3000,
      keepConnectionAlive: true,
      connectTimeoutMS: 15000,
    };
  }
}

const configService = new ConfigService(process.env).ensureEnvs([
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',
]);

export { configService };
