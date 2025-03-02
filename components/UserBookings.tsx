"use client"; // This makes it a Client Component

import CancelAppointment from "@/components/CancelAppointment";
import { Button } from "@/components/ui/button";
import BookingComponent from "./BookingComponent";
import { Session, User } from "next-auth";
import { useState } from "react";

interface Booking {
    id: string;
    date: Date;
    timeSlot: string;
    userId: string;
    createdAt: Date | null;
}

interface UserProps {
    id: string;
    fullName: string;
    email: string;
    role: "ADMIN" | "USER" | null;
    status: "BOOKED" | "NOT_BOOKED" | null;
    password: string;
    bookingId: string | null;
    createdAt: Date | null;
}

export default function UserBookings({
    session,
    fullUser,
    userBooking,
    allBookings,
}: {
    session: Session;
    fullUser: UserProps | null;
    userBooking: Booking | null;
    allBookings: Booking[];
}) {

    const [booking, setBooking] = useState<boolean>(false)

    return (
        <div className="">
            {fullUser?.bookingId ? (
                <>
                    <p className="font-ibm-plex-sans text-white font-black text-[40px]">
                        You have booked an appointment
                    </p>
                    <div className="mt-4 p-4 border w-fit rounded inline-block bg-gray-100">
                        <p className="text-xl">
                            <strong className="text-2xl mr-2">Date:</strong>{" "}
                            {new Date(userBooking?.date as Date).toDateString()}
                        </p>
                        <p className="text-xl">
                            <strong className="text-2xl mr-2">Time Slot:</strong>{" "}
                            {userBooking?.timeSlot}
                        </p>
                    </div>
                    <CancelAppointment bookingId={fullUser.bookingId} userId={fullUser.id} />
                </>
            ) : (
                <>
                    <p className="font-ibm-plex-sans text-white font-black text-[40px]">
                        You currently have no appointment
                    </p>
                    <Button disabled={booking} onClick={() => { setBooking(true) }} className="font-extrabold">Book an appointment</Button>
                    {booking && (
                        <BookingComponent bookings={allBookings} user={session?.user as User} />
                    )}
                </>
            )}
        </div>
    );
}
