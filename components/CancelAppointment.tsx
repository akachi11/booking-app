"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { cancelBooking } from "@/lib/actions/booking";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sendEmail } from '@/lib/workflow';
import { UserProps } from './ManageBookings';
import config from '@/lib/config';

interface CancelAppointmentProps {
    bookingId: string;
    userId: string;
    user: UserProps
}

const CancelAppointment: React.FC<CancelAppointmentProps> = ({ bookingId, userId, user }) => {

    const [cancelled, setCancelled] = useState<boolean>(false);

    const handleCancel = async () => {
        setCancelled(true);
        try {
            const result = await cancelBooking(bookingId, userId);
            if (result.success) {
                toast.success("Appointment cancelled successfully");
                sendEmail(user.email, "Appointment Cancelled", user.fullName, config.env.emailTemplates.cancelled)
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            } else {
                toast.error(result.error || "Failed to cancel appointment");
            }
        } catch (error) {
            console.log(error)
            toast.error("An error occurred while cancelling the appointment");
            setCancelled(false);
        }
    };

    return (
        <>
            <Button disabled={cancelled} className="block mt-4" onClick={handleCancel}>
                Cancel appointment
            </Button>
            <ToastContainer />
        </>
    );
};

export default CancelAppointment;