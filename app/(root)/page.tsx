import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { bookings, users } from "@/database/schema";
import { eq } from "drizzle-orm";
import UserBookings from "@/components/UserBookings";
import { Session } from "next-auth";
import config from "@/lib/config";
import { workflowClient } from "@/lib/workflow";
import ManageBookings from "@/components/ManageBookings";

export default async function Home() {
  const session = await auth();

  const registerWorkflow = async (email: string, fullName: string) => {
    try {
      console.log("Triggering Upstash Workflow...");
      const response = await workflowClient.trigger({
        url: `${config.env.prodApiEndpoint}/api/workflows/onboarding`,
        body: { email, fullName }
      });

      console.log("Workflow Trigger Response:", response);
    } catch (error) {
      console.error("Failed to trigger workflow:", error);
    }
  }

  let fullUser = null;
  let userBooking = null;
  const allBookings = await db.select().from(bookings);

  if (session?.user?.id) {
    const [user] = await db.select().from(users).where(eq(users.id, session.user.id)).limit(1);
    fullUser = user;

    registerWorkflow(fullUser?.email, fullUser?.fullName);

    if (user?.bookingId) {
      const [booking] = await db.select().from(bookings).where(eq(bookings.id, user.bookingId)).limit(1);
      userBooking = booking;
    }
  }

  return (
    fullUser?.role === "ADMIN" ?
      <ManageBookings
        session={session as Session}
        fullUser={fullUser}
        // userBooking={userBooking}
        allBookings={allBookings}
      /> :
      <UserBookings
        session={session as Session}
        fullUser={fullUser}
        userBooking={userBooking}
        allBookings={allBookings}
      />
  );
}