import { configService } from '@/infra/typeorm/config/config.service';
import fs = require('fs');

const migrations = configService.getTypeOrmConfig();

fs.writeFileSync(
  'ormconfig.json',
  JSON.stringify(
    [
      {
        ...migrations,
        entities: [`${__dirname}/../**/entities/**.entity{.ts,.js}`],
        migrations: [`${__dirname}/../**/migrations/*{.ts,.js}`],
      },
    ],
    null,
    2,
  ),
);
