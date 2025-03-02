import {Client as WorkflowClient} from "@upstash/workflow"
// import {Client as QstashClient} from "@upstash/qstash"
import config from "./config"

export const workflowClient = new WorkflowClient({
    baseUrl: config.env.upstash.qstashUrl,
    token: config.env.upstash.qstashToken
})

// const qstashClient = new QstashClient({
//     token: config.env.upstash.qstashToken
// })

export const sendEmailFunc = async (email: string, body: string, name: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_PROD_API_ENDPOINT}/api/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, body, name }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to send email");
      }
  
      console.log("✅ SUCCESS! Email sent.");
    } catch (error) {
      console.error("❌ Error sending email:", error);
      throw new Error("Email sending failed");
    }
  };
  
  
  