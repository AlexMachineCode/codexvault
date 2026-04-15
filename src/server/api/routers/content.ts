import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const contentRouter = createTRPCRouter({
  // CREATE
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        effect: z.string().optional(),
        type: z.enum(["background", "skills", "abilities", "items"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.content.create({
        data: {
          title: input.title,
          description: input.description,
          effect: input.effect,
          type: input.type,
        },
      });
    }),

  //  READ
  getByType: publicProcedure
    .input(
      z.object({
        type: z.enum(["background", "skills", "abilities", "items"]),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.content.findMany({
        where: {
          type: input.type,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }),

  //  UPDATE
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string(),
        description: z.string(),
        effect: z.string().optional(),
        type: z.enum(["background", "skills", "abilities", "items"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.content.update({
        where: { id: input.id },
        data: {
          title: input.title,
          description: input.description,
          effect: input.effect,
          type: input.type,
        },
      });
    }),

  // DELETE
  delete: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.content.delete({
        where: { id: input.id },
      });
    }),
});
