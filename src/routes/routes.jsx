// routeConfig
import config from "~/config";

// Router change Pages
import Home from "~/pages/Home";

import { Login, Register } from "~/pages/Auth";

const publicRoutes = [
  { path: config.routes.home, component: Home },

  { path: config.routes.login, component: Login, Layout: null },
  { path: config.routes.register, component: Register, Layout: null },

];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
