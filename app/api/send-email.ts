import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { email, message, name } = req.body;

    // Call EmailJS API from the frontend
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        service_id: "service_2qm6sy5",
        template_id: "template_klaxvff",
        user_id: "wX6vsu-NFP10-ovQH", // PUBLIC Key (Frontend)
        template_params: {
          to_email: email,
          message,
          to_name: name
        }
      })
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("EmailJS API Error:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
