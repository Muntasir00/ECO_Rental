import React from 'react';

const OtherRooms = () => {
    const otherRooms = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Spacious gray tone
            title: "Executive Suite",
            size: "50 m²",
            beds: "2 bed",
            bath: "1 bathroom",
            extra: "balcony"
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Spacious gray tone
            title: "Junior Suite",
            size: "50 m²",
            beds: "1 bed",
            bath: "1 bathroom",
            extra: "balcony"
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Spacious gray tone
            title: "Grand Deluxe",
            size: "80 m²",
            beds: "2 bed",
            bath: "1 bathroom",
            extra: "balcony"
        }
    ];

    return (
        <section className="py-10">

            {/* Section Heading */}
            <h2 className="text-xl md:text-3xl font-serif text-[#191818] mb-8">
                Other Rooms
            </h2>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                {otherRooms.map((room) => (
                    <div key={room.id} className="group cursor-pointer">

                        {/* Image Container */}
                        <div className="w-full h-64 overflow-hidden mb-5 bg-gray-100">
                            <img
                                src={room.image}
                                alt={room.title}
                                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>

                        {/* Content */}
                        <div>
                            <h3 className="text-xl md:text-3xl font-serif text-[#191818] mb-3 font-medium group-hover:text-gray-600 transition-colors">
                                {room.title}
                            </h3>

                            {/* Details Row with Red Separators */}
                            <div className="flex items-center text-sm text-[#7A7A7A] font-light gap-2">
                                <span>{room.size}</span>
                                <span className="text-[#E14453] text-[8px]">●</span>
                                <span>{room.beds}</span>
                                <span className="text-[#E14453] text-[8px]">●</span>
                                <span>{room.bath}</span>
                                <span className="text-[#E14453] text-[8px]">●</span>
                                <span>{room.extra}</span>
                            </div>
                        </div>

                    </div>
                ))}

            </div>
        </section>
    );
};

export default OtherRooms;