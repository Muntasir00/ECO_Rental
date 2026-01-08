import React, {useEffect, useState} from "react";
import {format} from "date-fns";
import {useNavigate, useSearchParams} from "react-router";
import {toast} from "sonner";
import BookingHeader from "~/pages/public/rooms/booking/BookingHeader";
import {SummaryView} from "~/pages/public/rooms/booking/SummaryView";
import {BookingInfoForm} from "~/pages/public/rooms/booking/BookingInfoForm";
import {PersonalDataForm} from "~/pages/public/rooms/booking/PersonalDataForm";
import {StepperIndicator} from "~/pages/public/rooms/booking/StepperIndicator";
import {RoomSummaryCard} from "~/pages/public/rooms/booking/RoomSummaryCard";
import {bookings} from "~/pages/public/rooms/roomActions";

export interface BookingPayload {
    // roomId: string;
    // firstName: string;
    // lastName: string;
    name: string;
    email: string;
    phone: string;
    checkIn: string;
    checkOut: string;
    roomsBooked: number;
    totalGuest: number;
    // referralCode?: string;
    // paymentMethod: string;
}

const BookingPage = () => {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // 1. Read URL Params
    const paramRoomId = searchParams.get("roomId");
    const paramStart = searchParams.get("start"); // "2026-01-07"
    const paramEnd = searchParams.get("end");     // "2026-01-10"
    const paramAvailableRooms = searchParams.get("availableRooms");
    const paramTotalGuests = searchParams.get("totalGuests");
    console.log(paramRoomId, paramStart, paramEnd, paramAvailableRooms, paramTotalGuests);

    const [currentStep, setCurrentStep] = useState(1);
    // const [formData, setFormData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    // 2. Initialize State with URL Data
    // We check if params exist, otherwise default to undefined/empty
    const [formData, setFormData] = useState<any>({
        roomId: paramRoomId || "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        // Convert string "2026-01-07" to Date Object for the Form
        checkIn: paramStart ? new Date(paramStart) : undefined,
        checkOut: paramEnd ? new Date(paramEnd) : undefined,
        totalRoom: "",
        totalGuest: "",
        referralCode: "",
    });

    // Optional: Redirect if no RoomID is found in URL
    useEffect(() => {
        if (!paramRoomId) {
            // toast.error("No room selected. Redirecting...");
            // navigate("/rooms");
        }
    }, [paramRoomId, navigate]);

    // Handlers
    const handleNextStep = (data: any) => {
        setFormData((prev: any) => ({...prev, ...data}));
        setCurrentStep((prev) => Math.min(prev + 1, 3));
        window.scrollTo({top: 0, behavior: "smooth"});
    };

    const handlePrevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
        window.scrollTo({top: 0, behavior: "smooth"});
    };

    const handleFinalSubmit = async () => {
        setIsLoading(true);
        try {
            // Prepare Data for API (Format Dates)
            const payload: BookingPayload = {
                name: formData.firstName + " " + formData.lastName,
                email: formData.email,
                phone: formData.phone,
                checkIn: format(formData.checkIn, "yyyy-MM-dd"),
                checkOut: format(formData.checkOut, "yyyy-MM-dd"),
                roomsBooked: Number(formData.totalRoom),
                totalGuest: Number(formData.totalGuest),
            };

            console.log("Submitting Payload:", payload);

            // Call API
            const result = await bookings(formData.roomId, payload);

            console.log("Success:", result);
            toast.success("Booking confirmed successfully!");

            // Navigate to success page
            // navigate(`/booking/success/${result._id}`);

        } catch (error) {
            console.error("Booking failed:", error);
            toast.error("Failed to create booking. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white font-sans text-[#1A1A1A]">
            {/* HERO SECTION */}
            <BookingHeader/>

            {/* MAIN CONTENT */}
            <main className="bg-[#FAFAFA]">
                <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8 md:gap-0">
                        <h1 className="text-3xl font-serif font-medium text-gray-900 self-start md:self-auto">
                            Booking Room
                        </h1>
                        <StepperIndicator currentStep={currentStep}/>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <RoomSummaryCard/>

                        <div className="order-1 lg:order-2 lg:col-span-8">
                            <div className="bg-white min-h-[400px] p-6 rounded-lg shadow-sm">

                                {/* STEP 1: Personal Data (Pass existing data to persist input if user goes back) */}
                                {currentStep === 1 && (
                                    <PersonalDataForm
                                        defaultValues={formData}
                                        onNext={handleNextStep}
                                    />
                                )}

                                {/* STEP 2: Booking Info (Will receive checkIn/checkOut from state) */}
                                {currentStep === 2 && (
                                    <BookingInfoForm
                                        defaultValues={formData}
                                        totalRooms={paramAvailableRooms}
                                        totalGuest={paramTotalGuests}
                                        onNext={handleNextStep}
                                        onPrev={handlePrevStep}
                                    />
                                )}

                                {/* STEP 3: Summary */}
                                {currentStep === 3 && (
                                    <SummaryView
                                        data={formData}
                                        onPrev={handlePrevStep}
                                        onSubmit={handleFinalSubmit}
                                        isLoading={isLoading}
                                    />
                                )}

                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default BookingPage;