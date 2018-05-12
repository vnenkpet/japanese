import * as Router from "koa-router";

import JmdictEntry from "../models/JmdictEntry";

const router = new Router();

router.get("/search/:key", async ctx => {
  ctx.body = await JmdictEntry.findByKey(
    ctx.params.key,
    Number(ctx.request.query.limit)
  );
});

export default router;
