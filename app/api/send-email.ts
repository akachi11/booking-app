import { NextApiRequest, NextApiResponse } from "next";
import emailjs from "@emailjs/browser";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { email, message, name } = req.body;

    // Send email via EmailJS
    await emailjs.send(
      "service_2qm6sy5", // Your Service ID
      "template_klaxvff", // Your Template ID
      { to_email: email, message, to_name: name },
      "wX6vsu-NFP10-ovQH" // Your Public Key
    );

    return res.status(200).json({ success: true, message: "Email sent!" });
  } catch (error) {
    console.error("EmailJS Error:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
