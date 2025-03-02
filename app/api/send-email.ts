import { NextApiRequest, NextApiResponse } from "next";
import emailjs from "@emailjs/browser";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, body, name } = req.body;

  try {
    const response = await emailjs.send(
      "service_2qm6sy5",
      "template_klaxvff",
      {
        to_email: email,
        message: body,
        to_name: name,
      },
      {
        publicKey: "wX6vsu-NFP10-ovQH", // Replace with your Public Key
      }
    );

    console.log("Email Sent Successfully!", response);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("EmailJS Error:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
