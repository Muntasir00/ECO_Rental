import React from 'react';

const RoomHeader = () => {
    return (
        <header className="relative w-full min-h-[400px]">

            <div className="absolute inset-0 w-full h-full">
                <img
                    src="https://images.unsplash.com/photo-1561501900-3701fa6a0864?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                    alt="Whispering Pines Retreat Lounge"
                    className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/40"></div>
            </div>
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white px-4 text-center">

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-medium tracking-wide drop-shadow-lg">
                    Whispering Pines Retreat
                </h1>

                <div className="w-24 md:w-32 h-[1px] bg-white mt-6 shadow-sm opacity-90"></div>

            </div>
        </header>
    );
};

export default RoomHeader;