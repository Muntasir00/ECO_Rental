import React from 'react';

const BlogHero = () => {
    return (
        <section className="relative w-full h-[40vh] md:h-[50vh] lg:h-[60vh] min-h-[300px]">

            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
                <img
                    // Using a similar placeholder image (Spa/Towel theme)
                    src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                    alt="Blog Hero Background"
                    className="w-full h-full object-cover object-center"
                />

                {/* Dark Overlay - Ensures text readability */}
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">

                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-wide drop-shadow-md">
                    Our Blog
                </h1>

                {/* Divider Line */}
                <div className="w-24 md:w-32 h-[1px] bg-white mt-4 md:mt-6 shadow-sm"></div>

            </div>
        </section>
    );
};

export default BlogHero;