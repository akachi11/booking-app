import { NextRequest, NextResponse } from "next/server";
import emailjs from "@emailjs/browser";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const { email, body: message, name } = body;

        // Validate inputs
        if (!email || !message || !name) {
            return NextResponse.json({ message: "Missing required fields", receivedBody: body }, { status: 400 });
        }

        const serviceId = "service_2qm6sy5";
        const templateId = "template_klaxvff";
        const publicKey = "wX6vsu-NFP10-ovQH";

        await emailjs.send(
            serviceId,
            templateId,
            { to_email: email, message: message, to_name: name },
            { publicKey }
        );

        return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
    } catch (error) {
        console.error("Email sending failed:", error);
        return NextResponse.json({ message: "Internal Server Error", error: error}, { status: 500 });
    }
}
