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
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        service_id: "service_2qm6sy5",
        template_id: "template_klaxvff",
        user_id: "wX6vsu-NFP10-ovQH", 
        template_params: {
          to_email: email,
          message: body,
          to_name: name
        }
      })
    });
  
    if (!response.ok) {
      console.error("EmailJS Error:", await response.text());
      throw new Error("Failed to send email");
    }
  
    console.log("SUCCESS! Email sent.");
  };
  