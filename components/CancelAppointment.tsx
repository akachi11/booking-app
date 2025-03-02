"use client"

import React from 'react';
import { Button } from "@/components/ui/button";
import { cancelBooking } from "@/lib/actions/booking";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface CancelAppointmentProps {
    bookingId: string;
    userId: string;
}

const CancelAppointment: React.FC<CancelAppointmentProps> = ({ bookingId, userId }) => {
    const handleCancel = async () => {
        try {
            const result = await cancelBooking(bookingId, userId);
            if (result.success) {
                toast.success("Appointment cancelled successfully");
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            } else {
                toast.error(result.error || "Failed to cancel appointment");
            }
        } catch (error) {
            console.log(error)
            toast.error("An error occurred while cancelling the appointment");
        }
    };

    return (
        <>
            <Button className="block mt-4" onClick={handleCancel}>
                Cancel appointment
            </Button>
            <ToastContainer />
        </>
    );
};

export default CancelAppointment;