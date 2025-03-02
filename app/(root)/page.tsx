import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { bookings, users } from "@/database/schema";
import { eq } from "drizzle-orm";
import UserBookings from "@/components/UserBookings";
import { Session } from "next-auth";

export default async function Home() {
  const session = await auth();

  let fullUser = null;
  let userBooking = null;
  const allBookings = await db.select().from(bookings);

  if (session?.user?.id) {
    const [user] = await db.select().from(users).where(eq(users.id, session.user.id)).limit(1);
    fullUser = user;

    if (user?.bookingId) {
      const [booking] = await db.select().from(bookings).where(eq(bookings.id, user.bookingId)).limit(1);
      userBooking = booking;
    }
  }

  return (
    <UserBookings
      session={session as Session}
      fullUser={fullUser}
      userBooking={userBooking}
      allBookings={allBookings}
    />
  );
}
