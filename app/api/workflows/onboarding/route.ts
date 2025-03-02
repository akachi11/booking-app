import { sendEmail } from "@/lib/workflow"
import { serve } from "@upstash/workflow/nextjs"

type InitialData = {
  email: string,
  name: string
}

export const { POST } = serve<InitialData>(async (context) => {
  const { email, name } = context.requestPayload

  await context.run("new-signup", async () => {
    sendEmail(email, "https://booking-app-five-jet.vercel.app/", name)
  })

  await context.sleep("wait-for-3-days", 60 * 60 * 24 * 3)
})