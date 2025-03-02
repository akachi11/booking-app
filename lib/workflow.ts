import {Client as WorkflowClient} from "@upstash/workflow"
// import {Client as QstashClient} from "@upstash/qstash"
import config from "./config"
import emailjs from '@emailjs/browser';

export const workflowClient = new WorkflowClient({
    baseUrl: config.env.upstash.qstashUrl,
    token: config.env.upstash.qstashToken
})

// const qstashClient = new QstashClient({
//     token: config.env.upstash.qstashToken
// })

export const sendEmail = async (email: string, subject: string, body: string, name: string) => {
    emailjs.send("service_2qm6sy5", "template_klaxvff", {
            to_email: email,
            message: body,
            to_name: name
        }, 
        {
            publicKey: "wX6vsu-NFP10-ovQH"}).then(
            () => {
              console.log('SUCCESS!');
            },
            (error) => {
              console.log('FAILED...', error.text);
            }
          );
};