import express from "express";
import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import { z } from "zod";
import { scrapeWebsite } from "./puppeteer";
import { runScraperColes } from "./scrape-y-combinator copy";

const appRouter = trpc.router().query("fetch-product", {
  input: z.string(),
  async resolve({ input }) {
    // return runScraperColes(input);
    const productData = await runScraperColes(input).then((res) => res);
    return productData;
  },
});

export type AppRouter = typeof appRouter;

const app = express();
app.use(cors());
const port = 8080;

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: () => null,
  })
);

app.get("/", (req, res) => {
  res.send("Hello from api-server");
});

app.listen(port, () => {
  console.log(`api-server listening at http://localhost:${port}`);
});
