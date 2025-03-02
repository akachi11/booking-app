"use client";

import React, { useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Button } from "./ui/button";
import { createBooking } from "@/lib/actions/booking";
import { User } from "next-auth";
import { toast } from "react-toastify";
import { sendEmail } from "@/lib/workflow";

const months = [
    { name: "January", value: 0 },
    { name: "February", value: 1 },
    { name: "March", value: 2 },
    { name: "April", value: 3 },
    { name: "May", value: 4 },
    { name: "June", value: 5 },
    { name: "July", value: 6 },
    { name: "August", value: 7 },
    { name: "September", value: 8 },
    { name: "October", value: 9 },
    { name: "November", value: 10 },
    { name: "December", value: 11 },
];

const timeSlots = [
    "08:00 - 08:30",
    "08:30 - 09:00",
    "09:00 - 09:30",
    "09:30 - 10:00",
    "10:00 - 10:30",
    "10:30 - 11:00",
    "11:00 - 11:30",
    "11:30 - 12:00",
    "12:00 - 12:30",
    "12:30 - 13:00",
    "13:00 - 13:30",
    "13:30 - 14:00",
    "14:00 - 14:30",
    "14:30 - 15:00",
    "15:00 - 15:30",
    "15:30 - 16:00",
    "16:00 - 16:30",
    "16:30 - 17:00",
];

interface Props {
    user: User,
    bookings: Booking[]
}

const BookingComponent = ({ user, bookings }: Props) => {
    const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
    const [booked, setBooked] = useState<boolean>(false);

    const calendarRef = useRef<HTMLDivElement>(null);
    const timeSlotRef = useRef<HTMLDivElement>(null);
    const summaryRef = useRef<HTMLDivElement>(null);

    const scrollToRef = (ref: React.RefObject<HTMLDivElement | null>) => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    const formatDate = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const bookAppointment = async () => {
        setBooked(true);
        const response = await createBooking({ date: selectedDate!, timeSlot: selectedTimeSlot!, userId: user.id! });

        const formattedDate = formatDate(selectedDate!);
        const emailContent = `${formattedDate} at ${selectedTimeSlot}`;

        if (response.success) {
            toast("Booking successful", { type: "success" });
            sendEmail(user.email!, emailContent, user.name!);
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        } else {
            toast("Booking failed", { type: "error" });
            setBooked(false);
        }
    }

    const isTimeSlotBooked = (date: Date, timeSlot: string) => {
        const selectedDateStr = date.toDateString();

        const match = bookings.some((booking) => {
            const bookingDateStr = new Date(booking.date).toDateString(); // Convert booking date to string

            // Compare the date and timeSlot
            const isMatch = bookingDateStr === selectedDateStr && booking.timeSlot === timeSlot;

            return isMatch;
        });

        return match;
    };


    useEffect(() => {
        setSelectedDate(null);
        if (selectedMonth !== null) {
            scrollToRef(calendarRef);
        }
    }, [selectedMonth]);

    useEffect(() => {
        if (selectedDate) {
            scrollToRef(timeSlotRef);
        }
    }, [selectedDate]);

    useEffect(() => {
        if (selectedTimeSlot) {
            scrollToRef(summaryRef);
        }
    }, [selectedTimeSlot]);

    return (
        <div>
            <div className="flex flex-col items-center space-y-4 p-4 xl:flex-row xl:space-x-8 xl:space-y-0">
                <div>
                    <select
                        className="p-2 border rounded"
                        onChange={(e) => setSelectedMonth(Number(e.target.value))}
                    >
                        <option value="">Select a Month</option>
                        {months.map((month) => (
                            <option key={month.value} value={month.value}>
                                {month.name}
                            </option>
                        ))}
                    </select>

                    {selectedMonth !== null && (
                        <div ref={calendarRef}>
                            <Calendar
                                onChange={(date) => setSelectedDate(date as Date)}
                                value={selectedDate || null}
                                activeStartDate={new Date(new Date().getFullYear(), selectedMonth, 1)}
                                minDate={new Date()}
                                maxDate={new Date(new Date().getFullYear(), selectedMonth + 1, 0)}
                                tileDisabled={({ date }) => {
                                    const today = new Date();
                                    return (
                                        date.getFullYear() === today.getFullYear() &&
                                        date.getMonth() === today.getMonth() &&
                                        date.getDate() === today.getDate()
                                    ) || date.getMonth() !== selectedMonth; // Disable dates not in the selected month
                                }}
                            />
                        </div>
                    )}
                </div>

                {selectedDate && (
                    <div ref={timeSlotRef} className="flex flex-col items-center space-y-2">
                        <h3 className="font-semibold text-white">Select a Time Slot</h3>
                        <div className="grid grid-cols-3 gap-2">
                            {timeSlots.map((slot) => {
                                const isBooked = isTimeSlotBooked(selectedDate, slot);

                                return (
                                    <Button
                                        key={slot}
                                        className={`p-2 border rounded ${selectedTimeSlot === slot ? "bg-blue-500 text-white" : ""
                                            } ${isBooked ? "bg-gray-400 text-gray-700 cursor-not-allowed" : ""}`}
                                        onClick={() => !isBooked && setSelectedTimeSlot(slot)}
                                        disabled={isBooked}
                                    >
                                        {slot}
                                    </Button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {selectedTimeSlot && (
                    <>
                        <div ref={summaryRef} className="mt-4 p-3 border rounded bg-gray-100">
                            <p>
                                <strong>Month:</strong> {months[selectedMonth!].name}
                            </p>
                            <p>
                                <strong>Date:</strong> {selectedDate?.toDateString()}
                            </p>
                            <p>
                                <strong>Time Slot:</strong> {selectedTimeSlot}
                            </p>
                        </div>
                    </>
                )}
            </div>

            {selectedTimeSlot && selectedMonth && selectedDate &&
                <div className="mt-4 text-center">
                    <Button disabled={booked} className="p-2" onClick={bookAppointment}>
                        Confirm Booking
                    </Button>
                </div>
            }
        </div>
    );
};

export default BookingComponent;
