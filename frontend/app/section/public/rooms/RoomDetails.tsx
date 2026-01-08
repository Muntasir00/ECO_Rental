import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {room as fetchRoomApi} from "~/pages/public/rooms/roomActions";
import FacilitiesSection from "~/section/public/rooms/FacilitiesSection";
import OtherRooms from "~/section/public/rooms/OtherRooms";
import {Skeleton} from "~/components/ui/skeleton";
import {CheckAvailability} from "~/pages/public/rooms/CheckAvailability"; // Ensure path is correct

interface RoomImage {
    url: string;
    publicId: string;
    _id: string;
}

interface RoomData {
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
    description?: string; // Optional, as it wasn't in your JSON, but used in UI
}

const RoomDetails = () => {
    // 2. Get ID from URL
    const {id} = useParams<{ id: string }>();

    // 3. State
    const [roomData, setRoomData] = useState<RoomData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 4. Fetch Logic
    useEffect(() => {
        const loadRoomData = async () => {
            if (!id) return;

            setIsLoading(true);
            try {
                // Pass ID as string (matches your latest requirement)
                const data = await fetchRoomApi(id);
                setRoomData(data);
            } catch (err) {
                console.error("Error loading room:", err);
                setError("Failed to load room details.");
            } finally {
                setIsLoading(false);
            }
        };

        loadRoomData();
    }, [id]);

    // Helper to safely get images (fallback if array is empty)
    const getMainImage = () => roomData?.images?.[0]?.url || "";
    // If you have multiple images, map them. If only 1 exists, we re-use it for the grid demo.
    const getGridImages = () => {
        const imgs = roomData?.images || [];
        // Fill array to ensure we have 3 images for the grid layout
        return [imgs[0], imgs[1] || imgs[0], imgs[2] || imgs[0]].filter(Boolean);
    };

    // ----------------------------------------------------------------------
    // 5. SKELETON LOADING STATE
    // ----------------------------------------------------------------------
    if (isLoading) {
        return (
            <div className="font-sans bg-white">
                {/* Hero Skeleton */}
                <Skeleton className="w-full h-[60vh] min-h-[400px]"/>

                <div className="bg-[#FAFAFA] w-full">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">

                        {/* Image Grid Skeleton */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
                            <Skeleton className="h-64 rounded-sm"/>
                            <Skeleton className="h-64 rounded-sm"/>
                            <Skeleton className="h-64 rounded-sm"/>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
                            {/* Content Skeleton */}
                            <div className="flex-1 space-y-6">
                                <Skeleton className="h-10 w-1/3 mb-6"/> {/* Title */}
                                <div className="space-y-4">
                                    <Skeleton className="h-4 w-full"/>
                                    <Skeleton className="h-4 w-full"/>
                                    <Skeleton className="h-4 w-3/4"/>
                                </div>
                                <Skeleton className="h-12 w-48 mt-8 rounded-sm"/> {/* Button */}
                            </div>

                            {/* Booking Form Skeleton */}
                            <div className="w-full lg:w-[400px] flex-shrink-0">
                                <Skeleton className="h-[400px] w-full bg-white rounded-sm"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // ----------------------------------------------------------------------
    // 6. ERROR STATE
    // ----------------------------------------------------------------------
    if (error || !roomData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-500 text-xl font-serif">Room not found or server error.</p>
            </div>
        );
    }

    // ----------------------------------------------------------------------
    // 7. DATA LOADED UI
    // ----------------------------------------------------------------------
    return (
        <div className="font-sans text-[#1A1A1A] bg-white">

            {/* Header / Hero Section */}
            <header className="relative w-full h-[60vh] min-h-[400px]">
                <div className="absolute inset-0 w-full h-full bg-gray-900">
                    <img
                        src={getMainImage()}
                        alt={roomData.name}
                        className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-black/30"></div>
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-4 drop-shadow-md">
                        {roomData.name}
                    </h1>
                    <div
                        className="flex items-center flex-wrap gap-3 text-sm md:text-base font-medium tracking-wide opacity-90">
                        <span>{roomData.size} m²</span>
                        <span className="w-1 h-1 bg-white rounded-full"></span>
                        <span>{roomData.bedroom} bed{roomData.bedroom > 1 ? 's' : ''}</span>
                        <span className="w-1 h-1 bg-white rounded-full"></span>
                        <span>{roomData.bathroom} bath{roomData.bathroom > 1 ? 's' : ''}</span>
                        {roomData.balcony && (
                            <>
                                <span className="w-1 h-1 bg-white rounded-full"></span>
                                <span>balcony</span>
                            </>
                        )}
                    </div>
                </div>
            </header>

            <div className="bg-[#FAFAFA] w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 ">

                    {/* Image Grid (Uses the first 3 images, or repeats if fewer exist) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
                        {getGridImages().map((img, index) => (
                            <div key={index} className="h-64 overflow-hidden rounded-sm bg-gray-200">
                                <img
                                    src={img?.url || ""}
                                    alt={`Room View ${index + 1}`}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

                        {/* Description Section */}
                        <div className="flex-1">
                            <h2 className="text-3xl font-serif font-medium mb-6">Description</h2>

                            <div className="text-gray-500 leading-relaxed space-y-6 mb-10 text-justify">
                                <p>
                                    Experience luxury at <strong>{roomData.name}</strong>, located
                                    at {roomData.location}.
                                    This spacious {roomData.size}m² suite features {roomData.bedroom} bedroom(s)
                                    and {roomData.bathroom} bathroom(s),
                                    perfect for up to {roomData.guest} guests.
                                </p>
                                <p>
                                    {roomData.balcony
                                        ? "Enjoy breathtaking views from your private balcony. "
                                        : "Designed for ultimate comfort and relaxation. "}
                                    A comfortable room atmosphere with elegant and modern furnishings awaits your
                                    arrival.
                                </p>
                            </div>

                            <button
                                className="border border-[#E5555C] text-[#E5555C] px-8 py-3 rounded-sm hover:bg-[#E5555C] hover:text-white transition-colors duration-300 font-medium text-sm">
                                Communicate with us
                            </button>
                        </div>

                        {/* Booking Sidebar */}
                        <div className="w-full lg:w-[400px] flex-shrink-0">
                            <div className="bg-white p-3 lg:p-4 shadow-sm">

                                {/* Header: Price */}
                                <div className="flex justify-between items-baseline mb-8">
                                    <h3 className="text-xl font-serif font-medium">Booking</h3>
                                    <div className="text-right">
                                        <span className="text-[#E5555C] text-xl font-bold">
                                            ${roomData.pricePerNight}
                                        </span>
                                        <span className="text-xs text-[#E5555C] font-normal"> / Night</span>
                                    </div>
                                </div>

                                {/* Form */}
                                <CheckAvailability id={id || ""}/>

                            </div>
                        </div>

                    </div>

                    <FacilitiesSection/>

                    <OtherRooms/>

                </div>
            </div>
        </div>
    );
};

export default RoomDetails;