import * as Koa from "koa";
import * as json from "koa-json";

import graphqlRouter from "./routers/graphql";
import restRouter from "./routers/rest";
import homeRouter from "./routers/welcome";

const app = new Koa();

app.use(json({ pretty: true, param: "pretty" }));

app.use(graphqlRouter.routes());
app.use(homeRouter.routes());
app.use(restRouter.routes());

export default app;
