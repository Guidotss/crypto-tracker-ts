import { envs } from "./config/envs";
import { Server, AppRoutes } from "./presentation";

(async () => {
  await main();
})();

async function main() {
  const server = new Server({
    port: envs.PORT,
    router: AppRoutes.routes,
  });

  server.start();
}
