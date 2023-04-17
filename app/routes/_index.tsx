import type { V2_MetaFunction } from "@remix-run/react"
import { useSaveFavoriteWord } from "./api.favorite-word"
import { FormHelper, InputHelper } from "remix-easy-mode"

export const meta: V2_MetaFunction = () => {
  return [{ title: "Favorite word app" }]
}

export default function Index() {
  const { form_props, run, result } = useSaveFavoriteWord()

  return (
    <div>
      <FormHelper form_props={form_props} on_submit={run}>
        <InputHelper
          form_props={form_props}
          label="Favorite word"
          name="word"
        />

        <button type="submit">Save</button>
      </FormHelper>

      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  )
}
