import { createServer } from 'vite';
import { resolve } from 'path';

(async () => {
  try {
    const server = await createServer({
      configFile: resolve(process.cwd(), 'artifacts/elite-tenancy/vite.config.ts'),
      root: resolve(process.cwd(), 'artifacts/elite-tenancy'),
      server: {
        port: 5173,
      }
    });
    await server.listen();
    server.printUrls();
  } catch (e) {
    console.error(e);
  }
})();
