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

export const sendEmail = async (email: string, body: string, name: string) => {
    const response = await fetch(`${config.env.prodApiEndpoint}/api/send-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, message: body, name }),
    });
  
    if (!response.ok) {
      console.error("Upstash Workflow -> EmailJS Error:", await response.text());
      throw new Error("Failed to send email");
    }
  
    console.log("SUCCESS! Email triggered.");
  };
  