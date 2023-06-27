import type { DataFunctionArgs } from "@remix-run/node"
import { dataFunctionHelper, useAction } from "remix-easy-mode"
import { z } from "zod"
import { prisma } from "~/server/prisma.server"

const schema = z.object({
  word: z
    .string()
    .trim()
    .min(1)
    .max(45)
    .refine((word) => {
      return word.match(/^[a-z]+$/)
    }),
})

export const action = (ctx: DataFunctionArgs) => {
  return dataFunctionHelper({
    ctx,
    schema,
    bouncer: null,
    fn: async ({ input }) => {
      return await prisma.favoriteWord.create({
        data: input,
      })
    },
  })
}

export const useSaveFavoriteWord = () => {
  return useAction<typeof action, typeof schema>({
    schema,
    path: "/api/favorite-word",
    onSuccess: (res) => {
      console.log(res)
    },
  })
}
