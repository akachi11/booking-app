import { sendEmail } from "@/lib/workflow"
import { serve } from "@upstash/workflow/nextjs"

type InitialData = {
  email: string,
  name: string
}

export const { POST } = serve<InitialData>(async (context) => {
  const { email, name } = context.requestPayload

  await context.run("new-signup", async () => {
    await sendEmail(email, "https://booking-app-five-jet.vercel.app/", name)
  })

  await context.sleep("wait-for-3-days", 60 * 60 * 24 * 3)

  // while (true) {
  //   const state = await context.run("check-user-state", async () => {
  //     return await getUserState()
  //   })

  //   if (state === "non-active") {
  //     await context.run("send-email-non-active", async () => {
  //       await sendEmail("Email to non-active users", email)
  //     })
  //   } else if (state === "active") {
  //     await context.run("send-email-active", async () => {
  //       await sendEmail("Send newsletter to active users", email)
  //     })
  //   }

  //   await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30)
  // }
})

// type UserState = "non-active" | "active"

// const getUserState = async (): Promise<UserState> => {
//   // Implement user state logic here
//   return "non-active"
// }