import React, {useState} from 'react';
import BookingGrid from './BookingGrid';

const bookingsData = [
    {
        id: 1,
        title: "Executive Deluxe",
        details: {size: "50 m²", beds: "2 bed", bath: "1 bathroom", extra: "balcony"},
        image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        title: "Premium Suite",
        details: {size: "50 m²", beds: "1 bed", bath: "1 bathroom", extra: "balcony"},
        image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        title: "Premium Deluxe",
        details: {size: "60 m²", beds: "1 bed", bath: "1 bathroom", extra: "balcony"},
        image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
];

const BookingsPage = () => {
    // State to handle tab switching (mimicking Tabs functionality)
    const [activeTab, setActiveTab] = useState("ongoing");

    return (
        <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 font-sans text-[#1A1A1A]">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-serif font-medium mb-2">
                        Bookings
                    </h1>
                    <p className="text-gray-500 font-light text-sm">
                        Welcome Aftab uz zaman
                    </p>
                </div>

                <div className="w-full">

                    {/* Tabs List / Triggers */}
                    <div
                        className="flex flex-col sm:flex-row gap-4 mb-8 border-b border-gray-100 pb-8 sm:border-none sm:pb-0">
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

                    {activeTab === "ongoing" && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <BookingGrid data={bookingsData}/>
                        </div>
                    )}

                    {activeTab === "past" && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <BookingGrid data={[...bookingsData].reverse()}/>
                        </div>
                    )}

                </div>

            </div>
        </div>
    );
};


export default BookingsPage;