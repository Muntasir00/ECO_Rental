import React from 'react';

const NewsSection = () => {
    return (
        <section className="bg-white py-10 px-6 font-sans">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
                    <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] leading-tight max-w-2xl">
                        Stay up to date with all the <br /> news about us
                    </h2>
                    <p className="text-gray-500 text-sm md:text-base max-w-xs leading-relaxed">
                        Keep up with news about us regarding the facilities, events and promos that we provide, all here
                    </p>
                </div>

                {/* Horizontal Divider */}
                <hr className="border-gray-200 mb-12" />

                {/* Grid Layout
            Mobile: 1 column
            Tablet: 2 columns (Featured image spans full width)
            Desktop: 4 columns (Featured image spans 2 cols, others 1 col)
        */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:h-[550px]">

                    {/* 1. Featured Card (Large Image) */}
                    <div className="md:col-span-2 relative group overflow-hidden h-[400px] md:h-[450px] lg:h-full">
                        <img
                            src="https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                            alt="Golf Course Aerial"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* Dark Gradient Overlay for Text Readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                        {/* Content Overlay */}
                        <div className="absolute bottom-0 left-0 p-8 text-white w-full">
                            <span className="text-xs uppercase tracking-wider text-gray-300 mb-2 block">20 May 2023</span>
                            <h3 className="text-2xl md:text-3xl font-serif font-medium mb-3 leading-snug">
                                Webinar event Mental training for young people to develop
                            </h3>
                            <p className="text-gray-300 text-sm opacity-90 line-clamp-2">
                                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                            </p>
                        </div>
                    </div>

                    {/* 2. Vertical Image (Middle) */}
                    <div className="h-[300px] md:h-[400px] lg:h-full overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                            alt="Interior Detail"
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                        />
                    </div>

                    {/* 3. Vertical Image (Right) */}
                    <div className="h-[300px] md:h-[400px] lg:h-full overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                            alt="Architecture Detail"
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                        />
                    </div>

                </div>

            </div>
        </section>
    );
};

export default NewsSection;