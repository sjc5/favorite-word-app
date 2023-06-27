import type { V2_MetaFunction } from "@remix-run/react"
import { useSaveFavoriteWord } from "./api.favorite-word"
import { InputHelper } from "remix-easy-mode"

export const meta: V2_MetaFunction = () => {
  return [{ title: "Favorite word app" }]
}

export default function Index() {
  const { Form, mutate, result, fields } = useSaveFavoriteWord()

  return (
    <div>
      <Form onSubmit={mutate}>
        <InputHelper {...fields.word.inputProps} />
        <pre>{JSON.stringify(fields.word.errors, null, 2)}</pre>
        <button type="submit">Save</button>
      </Form>

      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  )
}
