import { Application} from "./deps.ts";
import ProductRoute from './routes/product.route.ts';
import { logger } from "./middlewares/logger.middleware.ts";

import './configs/db.config.ts';

const PORT = 8080;
const app = new Application();

app.use(logger);
app.use(ProductRoute.routes());

console.log(`Server en: http://localhost:${PORT}`);
await app.listen({ port: PORT });