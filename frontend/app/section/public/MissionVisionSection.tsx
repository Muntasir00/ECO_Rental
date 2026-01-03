import React from 'react';

const MissionVisionSection = () => {
    return (
        <div className="min-h-screen bg-[#FAFAFA] py-16 px-4 md:px-8 font-sans text-gray-800">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="text-center mb-12 md:mb-16">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#1A1A1A] leading-tight">
                        Helping You Find The Most Comfortable Place
                        {/*Helping You Find The Most <br className="hidden md:block" /> Comfortable Place*/}
                    </h1>
                </div>

                {/* Grid Layout
            Mobile: 1 column
            Tablet: 2 columns
            Desktop: 4 columns
        */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[320px]">

                    {/* 1. Our Mission (Top Left) */}
                    <div className="bg-[#F5F5F5] rounded-3xl p-8 flex flex-col justify-between relative group hover:shadow-lg transition-shadow duration-300">
                        <div>
                            <h3 className="text-xl font-serif font-semibold mb-4 text-black">Our Mission</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Lorem ipsum dolor sit amet consectetur. Lacus ut e.
                            </p>
                        </div>
                        {/* Checkmark Icon */}
                        <div className="mt-4">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>
                    </div>

                    {/* 2. Red Card (Top Middle-Left) */}
                    <div className="bg-[#E5555C] rounded-3xl p-8 flex flex-col justify-center items-center text-center text-white hover:shadow-lg transition-shadow duration-300">
                        <p className="text-lg font-medium leading-relaxed">
                            Lorem ipsum dolor sit amet consectetur.
                            Lacus ut enim turpis imperdiet. Lorem ipsum dolor sit amet consectetur.
                            Lacus ut enim turpis imperdiet.
                        </p>
                    </div>

                    {/* 3. Tall Image (Top Middle-Right - Spans 2 Rows on Desktop) */}
                    <div className="md:col-span-1 lg:col-span-1 lg:row-span-2 rounded-3xl overflow-hidden relative group">
                        <img
                            src="/image/about_4.png"
                            alt="Modern Living Room"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>

                    {/* 4. Our Vision (Top Right) */}
                    <div className="bg-[#1A1A1A] rounded-3xl p-8 flex flex-col justify-between text-white hover:shadow-lg transition-shadow duration-300">
                        <div>
                            <h3 className="text-xl font-serif font-semibold mb-4">Our Vision</h3>
                            <p className="text-sm text-gray-300 leading-relaxed">
                                Lorem ipsum dolor sit amet consectetur. Lacus ut e.
                            </p>
                        </div>
                        <div className="flex justify-end mt-4">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>
                    </div>

                    {/* 5. Green Image (Bottom Left) */}
                    <div className="rounded-3xl overflow-hidden relative group">
                        <img
                            src="https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                            alt="Aerial Golf Course"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>

                    {/* 6. Dark Card with Inset Image (Bottom Middle-Left) */}
                    <div className="bg-[#1A1A1A] rounded-3xl relative overflow-hidden group">
                        <div className="absolute bottom-6 right-6 w-32 h-20 rounded-lg overflow-hidden border-2 border-gray-700 shadow-xl z-10">
                            <img
                                src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                                alt="Interior Detail"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* 7. Bedroom Image (Bottom Right) */}
                    <div className="rounded-3xl overflow-hidden relative group">
                        <img
                            src="/image/about_5.png"
                            alt="Cozy Bedroom"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MissionVisionSection;