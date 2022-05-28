import envFolderPath, { envs } from '@/config/env';

import { ConfigModule } from '@nestjs/config';

export const imports = [
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: envFolderPath.folderPath,
    load: [envs],
  }),
];
