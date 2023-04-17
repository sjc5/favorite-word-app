import type { DataFunctionArgs } from "@remix-run/node"
import { data_function_helper, useAction } from "remix-easy-mode"
import { z } from "zod"
import { prisma } from "~/server/prisma.server"

const input_schema = z.object({
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
  return data_function_helper({
    ctx,
    input_schema,
    bouncer: null,
    callback: async ({ input }) => {
      return await prisma.favoriteWord.create({
        data: input,
      })
    },
  })
}

export const useSaveFavoriteWord = () => {
  return useAction<typeof action, typeof input_schema>({
    input_schema,
    path: "/api/favorite-word",
    on_success: (res) => {
      console.log(res)
    },
  })
}
