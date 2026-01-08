import React, {useEffect, useState} from 'react';
import {rooms} from "~/pages/public/rooms/roomActions";
import {Skeleton} from "~/components/ui/skeleton"; // Ensure this path is correct
import {cn} from "~/lib/utils";
import {Link} from "react-router";
import {useContentStore} from "~/store/contentStore";
import {useAuthContext} from "~/auth/hooks"; // Standard shadcn utility

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
    images: RoomImage[];
    createdAt: string;
}

interface PaginationData {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

interface ApiResponse {
    rooms: Room[];
    pagination: PaginationData;
}

const RoomList = () => {
    const {authenticated} = useAuthContext();
    // State
    const [roomsData, setRoomsData] = useState<Room[]>([]);
    const [pagination, setPagination] = useState<PaginationData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch Function
    const fetchRooms = async (pageNumber: number) => {
        setIsLoading(true);
        // Scroll to top smoothly when page changes
        window.scrollTo({top: 0, behavior: 'smooth'});

        try {
            // @ts-ignore
            const res: ApiResponse = await rooms(pageNumber);

            setRoomsData(res.rooms);
            setPagination(res.pagination);
        } catch (error) {
            console.error("Failed to fetch rooms:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Initial Load
    useEffect(() => {
        fetchRooms(1);
    }, []);

    // Helper to format room details string
    const getRoomDetails = (room: Room) => {
        const parts = [
            `${room.size} m²`,
            `${room.bedroom} bed${room.bedroom > 1 ? 's' : ''}`,
            `${room.bathroom} bath${room.bathroom > 1 ? 's' : ''}`
        ];
        if (room.balcony) parts.push('balcony');
        return parts.join(' • ');
    };

    return (
        <div className="bg-white py-12 px-4 sm:px-6 lg:px-8 font-sans text-[#1A1A1A] min-h-screen">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="mb-8">
                    <h2 className="text-2xl font-medium mb-6">Our Rooms</h2>
                    <hr className="border-gray-200"/>
                </div>

                {/* Grid Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mb-16">

                    {isLoading ? (
                        Array.from({length: 6}).map((_, index) => (
                            <div key={index} className="flex flex-col">
                                {/* Image Skeleton */}
                                <Skeleton className="w-full h-64 mb-4 rounded-none bg-gray-200"/>

                                {/* Text Skeleton */}
                                <div className="space-y-3">
                                    <Skeleton className="h-6 w-3/4 bg-gray-200"/>
                                    <Skeleton className="h-4 w-1/2 bg-gray-200"/>
                                </div>
                            </div>
                        ))
                    ) : (

                        roomsData.length > 0 ? (
                            roomsData.map((room) => (
                                <Link to={`/room/${room._id}`}>
                                    <div key={room._id} className="group cursor-pointer flex flex-col h-full">
                                        {/* Image */}
                                        <div className="w-full h-64 overflow-hidden mb-4 bg-gray-100 relative">
                                            {room.images.length > 0 ? (
                                                <img
                                                    src={room.images[0].url}
                                                    alt={room.name}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div
                                                    className="w-full h-full flex items-center justify-center text-gray-400">
                                                    No Image
                                                </div>
                                            )}

                                            {/* Optional: Availability Badge */}
                                            {!room.available && (
                                                <div
                                                    className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 uppercase tracking-wide">
                                                    Booked
                                                </div>
                                            )}
                                        </div>

                                        {/* Text Content */}
                                        <div className="flex flex-col">
                                            <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                                                {room.name}
                                            </h3>
                                            <p className="text-xs text-gray-500 font-light tracking-wide">
                                                {getRoomDetails(room)}
                                            </p>
                                            <p className="text-sm font-semibold mt-2 text-[#1A1A1A]">
                                                ${room.pricePerNight} / night
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-10 text-gray-500">
                                No rooms found.
                            </div>
                        )
                    )}
                </div>

                {!isLoading && pagination && pagination.totalPages > 1 && (
                    <div className="flex justify-center items-center gap-3">
                        {Array.from({length: pagination.totalPages}).map((_, i) => {
                            const pageNum = i + 1;
                            const isActive = pageNum === pagination.page;

                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => fetchRooms(pageNum)}
                                    className={cn(
                                        "w-10 h-10 flex items-center justify-center text-sm font-medium transition-colors border",
                                        isActive
                                            ? "bg-[#1A1A1A] text-white border-[#1A1A1A]" // Active Style
                                            : "bg-white text-gray-500 border-gray-300 hover:border-black hover:text-black" // Inactive Style
                                    )}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}
                    </div>
                )}

            </div>
        </div>
    );
};

export default RoomList;