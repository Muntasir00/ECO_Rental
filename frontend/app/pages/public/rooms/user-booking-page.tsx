import React, { useEffect, useState } from 'react';
import BookingGrid from './BookingGrid';
import { myBookings } from "~/pages/public/rooms/roomActions";
import { Skeleton } from "~/components/ui/skeleton";
import {useAuthContext} from "~/auth/hooks";

interface RoomImage {
    url: string;
    publicId: string;
    _id: string;
}

interface Room {
    _id: string;
    name: string;
    location: string;
    size: number;
    bedroom: number;
    bathroom: number;
    balcony: boolean;
    availableRooms: number;
    pricePerNight: number;
    available: boolean;
    guest: number;
    images: RoomImage[];
    createdAt: string;
    updatedAt: string;
}

interface BookingApiResponse {
    _id: string;
    user: string;
    room: Room;
    name: string;
    email: string;
    phoneNumber: string;
    checkIn: string;
    checkOut: string;
    discount: number;
    totalGuest: number;
    totalPrice: number;
    status: 'ongoing' | 'completed' | 'cancelled' | string;
    roomsBooked: number;
    createdAt: string;
    updatedAt: string;
}

// Transformed Data Interface for the Grid Component
export interface BookingUIItem {
    id: string;
    title: string;
    status: string;
    checkOut: string;
    details: {
        size: string;
        beds: string;
        bath: string;
        extra: string;
    };
    image: string;
}

const UserBookingPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'ongoing' | 'past'>("ongoing");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [bookings, setBookings] = useState<BookingUIItem[]>([]);
    const { user } = useAuthContext();

    useEffect(() => {
        async function fetchMyBooking() {
            try {
                setIsLoading(true);
                // Explicitly casting the response or defining return type in roomActions is recommended
                const res: BookingApiResponse[] = await myBookings();

                // Transform API data to match BookingGrid expected structure
                const formattedData: BookingUIItem[] = Array.isArray(res)
                    ? res.map((item) => ({
                        id: item._id,
                        title: item.room?.name || "Unknown Room",
                        status: item.status,
                        checkOut: item.checkOut,
                        details: {
                            size: item.room?.size ? `${item.room.size} m²` : "N/A",
                            beds: item.room?.bedroom ? `${item.room.bedroom} bed` : "N/A",
                            bath: item.room?.bathroom ? `${item.room.bathroom} bath` : "N/A",
                            extra: item.room?.balcony ? "balcony" : ""
                        },
                        image: item.room?.images?.[0]?.url || "https://via.placeholder.com/400"
                    }))
                    : [];

                setBookings(formattedData);
            } catch (e) {
                console.error("Failed to fetch bookings:", e);
            } finally {
                setIsLoading(false);
            }
        }

        fetchMyBooking();
    }, []);

    // Filter Logic
    const filteredBookings = bookings.filter((booking) => {
        if (activeTab === "ongoing") {
            return booking.status === "ongoing";
        } else {
            // Past bookings logic (completed, cancelled, or specific past status)
            return booking.status !== "ongoing";
        }
    });

    return (
        <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 font-sans text-[#1A1A1A]">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-serif font-medium mb-2">
                        Bookings
                    </h1>
                    <p className="text-gray-500 font-light text-sm">
                        Welcome {user?.fullName}
                    </p>
                </div>

                <div className="w-full">
                    {/* Tabs List / Triggers */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-8 border-b border-gray-100 pb-8 sm:border-none sm:pb-0">
                        <button
                            onClick={() => setActiveTab("ongoing")}
                            className={`cursor-pointer px-8 py-2.5 text-sm font-medium rounded-sm transition-all duration-200
                                ${activeTab === "ongoing"
                                ? "bg-[#E5555C] text-white shadow-md border border-[#E5555C]"
                                : "bg-white text-[#E5555C] border border-[#E5555C] hover:bg-red-50"}
                              `}
                        >
                            Ongoing bookings
                        </button>

                        <button
                            onClick={() => setActiveTab("past")}
                            className={`cursor-pointer px-8 py-2.5 text-sm font-medium rounded-sm transition-all duration-200
                                ${activeTab === "past"
                                ? "bg-[#E5555C] text-white shadow-md border border-[#E5555C]"
                                : "bg-white text-[#E5555C] border border-[#E5555C] hover:bg-red-50"}
                              `}
                        >
                            Past bookings
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[300px]">
                        {isLoading ? (
                            <BookingsSkeleton />
                        ) : filteredBookings.length > 0 ? (
                            <BookingGrid data={filteredBookings} />
                        ) : (
                            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                                <p className="text-lg">No {activeTab} bookings found.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Skeleton Component
const BookingsSkeleton: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col space-y-3">
                    {/* Image Placeholder */}
                    <Skeleton className="h-[200px] w-full rounded-xl bg-gray-200" />
                    <div className="space-y-2 p-2">
                        {/* Title Placeholder */}
                        <Skeleton className="h-6 w-3/4 bg-gray-200" />
                        {/* Details Placeholder */}
                        <div className="flex gap-2">
                            <Skeleton className="h-4 w-12 bg-gray-200" />
                            <Skeleton className="h-4 w-12 bg-gray-200" />
                            <Skeleton className="h-4 w-12 bg-gray-200" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UserBookingPage;