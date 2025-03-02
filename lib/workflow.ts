import {Client as WorkflowClient} from "@upstash/workflow"
// import {Client as QstashClient} from "@upstash/qstash"
import config from "./config"
import { sendEmailFunc } from "@/app/api/send-email";

export const workflowClient = new WorkflowClient({
    baseUrl: config.env.upstash.qstashUrl,
    token: config.env.upstash.qstashToken
})

// const qstashClient = new QstashClient({
//     token: config.env.upstash.qstashToken
// })

export const sendEmail = async (email: string, body: string, name: string) => {
    sendEmailFunc(email, body, name);
  };
  