import { serve } from "@upstash/workflow/nextjs"

type InitialData = {
  email: string,
  name: string
}

export const { POST } = serve<InitialData>(async (context) => {
  const { email, name } = context.requestPayload

  await context.run("new-signup", async () => {
    await fetch(`${process.env.NEXT_PUBLIC_PROD_API_ENDPOINT ?? "http://localhost:3000"}/api/register-workflow`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
          email: email,
          body: "This is a test email.",
          name: name
      }),
  });
  })

  await context.sleep("wait-for-3-days", 60 * 60 * 24 * 3)
})