import React from 'react';

// Mock data to generate the grid items
const roomsData = [
    {
        id: 1,
        title: "Executive Deluxe",
        details: "50 m² • 2 bed • 1 bathroom • balcony",
        image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        title: "Premium Suite",
        details: "50 m² • 1 bed • 1 bathroom • balcony",
        image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        title: "Premium Deluxe",
        details: "60 m² • 1 bed • 1 bathroom • balcony",
        image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4,
        title: "Executive Deluxe",
        details: "50 m² • 2 bed • 1 bathroom • balcony",
        image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 5,
        title: "Premium Suite",
        details: "50 m² • 1 bed • 1 bathroom • balcony",
        image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 6,
        title: "Premium Deluxe",
        details: "60 m² • 1 bed • 1 bathroom • balcony",
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 7,
        title: "Executive Deluxe",
        details: "50 m² • 2 bed • 1 bathroom • balcony",
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 8,
        title: "Premium Suite",
        details: "50 m² • 1 bed • 1 bathroom • balcony",
        image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 9,
        title: "Premium Deluxe",
        details: "60 m² • 1 bed • 1 bathroom • balcony",
        image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
];

const RoomList = () => {
    return (
        <div className="bg-white py-12 px-4 sm:px-6 lg:px-8 font-sans text-[#1A1A1A]">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="mb-8">
                    <h2 className="text-2xl font-medium mb-6">Our Rooms</h2>
                    <hr className="border-gray-200" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mb-16">
                    {roomsData.map((room) => (
                        <div key={room.id} className="group cursor-pointer">

                            {/* Image */}
                            <div className="w-full h-64 overflow-hidden mb-4 bg-gray-100">
                                <img
                                    src={room.image}
                                    alt={room.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            {/* Text Content */}
                            <div className="flex flex-col">
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    {room.title}
                                </h3>
                                <p className="text-xs text-gray-500 font-light tracking-wide">
                                    {room.details}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination Section */}
                <div className="flex justify-center items-center gap-3">
                    <button className="w-10 h-10 flex items-center justify-center bg-[#1A1A1A] text-white text-sm font-medium border border-[#1A1A1A]">
                        1
                    </button>

                    <button className="w-10 h-10 flex items-center justify-center bg-white text-gray-500 text-sm font-medium border border-gray-300 hover:border-black hover:text-black transition-colors">
                        2
                    </button>

                    <button className="w-10 h-10 flex items-center justify-center bg-white text-gray-500 text-sm font-medium border border-gray-300 hover:border-black hover:text-black transition-colors">
                        3
                    </button>
                </div>

            </div>
        </div>
    );
};

export default RoomList;