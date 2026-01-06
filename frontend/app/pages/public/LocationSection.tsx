import React from 'react';

const LocationSection = ({bgColor= "#F5F5F5"}) => {
    return (
        <section className={`max-w-7xl mx-auto bg-[${bgColor}] py-16 px-4 sm:px-6 lg:px-8 mb-8`}>

            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-5xl font-serif text-[#191818]">
                    Visit our rentals and book a room!
                </h2>
            </div>

            <div className="relative w-full h-[300px] md:h-[400px] lg:h-[450px] bg-gray-200 overflow-hidden shadow-sm">

                {/* Map Image (Grayscale/Light style) */}
                <img
                    // Using a generic map image. In a real app, this could be a Google Maps Embed or a specific screenshot.
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                    alt="Location Map"
                    className="w-full h-full object-cover opacity-80 grayscale-[0.2]"
                />

                {/* Custom Red Pin Overlay */}
                <div className="absolute top-[40%] left-[55%] -translate-x-1/2 -translate-y-1/2 drop-shadow-md">
                    <svg
                        width="40"
                        height="50"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="animate-bounce" // Optional: Adds a gentle bounce
                    >
                        <path
                            d="M12 0C7.58 0 4 3.58 4 8C4 13.5 12 24 12 24C12 24 20 13.5 20 8C20 3.58 16.42 0 12 0Z"
                            fill="#E5555C" // Brand Red Color
                        />
                        <circle cx="12" cy="8" r="3.5" fill="white"/>
                    </svg>
                </div>

                {/* Optional: Street Labels Overlay (To mimic the screenshot text) */}
                <div
                    className="absolute top-1/2 left-10 hidden md:block text-gray-400 font-medium -rotate-90 text-sm tracking-widest">
                    Alabama St
                </div>
                <div
                    className="absolute top-1/2 right-20 hidden md:block text-gray-400 font-medium -rotate-90 text-sm tracking-widest">
                    Utah St
                </div>
                <div
                    className="absolute bottom-4 right-1/4 hidden md:block text-gray-400 font-medium text-sm tracking-widest">
                    16th St
                </div>

            </div>

        </section>
    );
};

export default LocationSection;