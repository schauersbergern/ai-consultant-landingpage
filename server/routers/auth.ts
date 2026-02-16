import { publicProcedure, router, protectedProcedure } from "../_core/trpc";
import { z } from "zod";

export const authRouter = router({
    me: publicProcedure.query(async ({ ctx }) => {
        return ctx.user;
    }),
});
