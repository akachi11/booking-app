import { serve } from "@upstash/workflow/nextjs"

type InitialData = {
  email: string,
  name: string
}

export const { POST } = serve<InitialData>(async (context) => {
  const { email, name } = context.requestPayload;

  console.log("Sending email with:", { email, name });

  await context.run("new-signup", async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_PROD_API_ENDPOINT ?? "http://localhost:3000"}/api/send-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
          email: email,
          body: "This is a test email.",
          name: name
      }),
    });

    const data = await response.json();
    console.log("Response from API:", data);
  });

  await context.sleep("wait-for-3-days", 60 * 60 * 24 * 3);
});
