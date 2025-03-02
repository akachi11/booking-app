"use client";

import { useState } from "react";
import { Session } from "next-auth";
import { Button } from "@/components/ui/button";
import CancelAppointment from "@/components/CancelAppointment";

interface Booking {
    id: string;
    date: Date;
    timeSlot: string;
    userId: string;
    createdAt: Date | null;
}

export interface UserProps {
    id: string;
    fullName: string;
    email: string;
    role: "ADMIN" | "USER" | null;
    status: "BOOKED" | "NOT_BOOKED" | null;
    bookingId: string | null;
    createdAt: Date | null;
}

export default function ManageBookings({
    allBookings,
}: {
    session: Session;
    fullUser: UserProps | null;
    allBookings: Booking[];
}) {
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [selectedUser, setSelectedUser] = useState<UserProps | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleManageBooking = async (booking: Booking) => {
        setSelectedBooking(booking);
        setLoading(true);
        // try {
        //     const response = await fetch(`/api/get-user?userId=${booking.userId}`);
        //     if (!response.ok) {
        //         throw new Error("Failed to fetch user data");
        //     }
        //     const user: UserProps = await response.json();
        //     setSelectedUser(user);
        //     setIsModalOpen(true);
        // } catch (error) {
        //     console.error(error);
        // } finally {
        //     setLoading(false);
        // }
        try {
            const response = await fetch(`/api/get-user?userId=${booking.userId}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${await response.text()}`);
            }

            const user: UserProps = await response.json();
            setSelectedUser(user);
            setIsModalOpen(true);
        } catch (error) {
            console.error("Failed to fetch user:", error);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="font-ibm-plex-sans text-white font-black text-[40px]">
                Manage Bookings
            </h2>

            {allBookings.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2 border">Date</th>
                                <th className="px-4 py-2 border">Time Slot</th>
                                <th className="px-4 py-2 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allBookings.map((booking) => (
                                <tr key={booking.id} className="text-center">
                                    <td className="px-4 py-2 border">{new Date(booking.date).toDateString()}</td>
                                    <td className="px-4 py-2 border">{booking.timeSlot}</td>
                                    <td className="px-4 py-2 border">
                                        <Button
                                            onClick={() => handleManageBooking(booking)}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                                            disabled={loading}
                                        >
                                            {loading && selectedBooking?.id === booking.id ? "Loading..." : "Manage Booking"}
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-500">No bookings available.</p>
            )}

            {isModalOpen && selectedBooking && selectedUser && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-xl font-bold mb-4">Booking Details</h3>
                        <p><strong>Date:</strong> {new Date(selectedBooking.date).toDateString()}</p>
                        <p><strong>Time Slot:</strong> {selectedBooking.timeSlot}</p>
                        <hr className="my-4" />
                        <p><strong>Booked By:</strong> {selectedUser.fullName}</p>
                        <p><strong>Email:</strong> {selectedUser.email}</p>
                        <div className="mt-4 flex justify-between">
                            <CancelAppointment user={selectedUser} bookingId={selectedBooking.id} userId={selectedUser.id} />
                            <Button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
