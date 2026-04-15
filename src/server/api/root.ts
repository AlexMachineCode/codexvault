import { contentRouter } from "./routers/content";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

/**
 * Primary router
 */
export const appRouter = createTRPCRouter({
  content: contentRouter,
});

/**
 * Type da API (sempre depois)
 */
export type AppRouter = typeof appRouter;

/**
 * Caller (sempre depois também)
 */
export const createCaller = createCallerFactory(appRouter);
