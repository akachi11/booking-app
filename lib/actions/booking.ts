"use server";

import { db } from "@/database/drizzle";
import { bookings, STATUS_ENUM, users } from "@/database/schema";
import { and, eq } from "drizzle-orm";

export const createBooking = async (params: Booking) => {
    const { userId, date, timeSlot } = params;
    const existingBooking = await db.select().from(bookings).where(and(eq(bookings.date, date), eq(bookings.timeSlot, timeSlot))).limit(1);

    if (existingBooking.length > 0) {
        return { success: false, error: "Time slot already booked" };
    }

    try {
        const [newBooking] = await db.insert(bookings).values({
            date,
            timeSlot,
            userId
        }).returning({ id: bookings.id });

        await db.update(users)
            .set({ bookingId: newBooking.id, status: STATUS_ENUM.enumValues[0] })
            .where(eq(users.id, userId));

        return { success: true };
    } catch (error) {
        console.log(error, "Sign up error");
        return { success: false, error: "Sign up error" };
    }
}

export const cancelBooking = async (bookingId: string, userId: string) => {
    try {
        await db.delete(bookings).where(eq(bookings.id, bookingId));

        await db.update(users)
            .set({ bookingId: null, status: STATUS_ENUM.enumValues[1] }) 
            .where(eq(users.id, userId));

        return { success: true };
    } catch (error) {
        console.log(error, "Cancel booking error");
        return { success: false, error: "Cancel booking error" };
    }
}

export const getAllBookings = async() => {
    return await db.select().from(bookings);
}