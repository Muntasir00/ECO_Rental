import React from 'react';
import { Star } from 'lucide-react';

const StatsSection = () => {
    const stats = [
        { id: 1, number: "100+", label: "Comfortable", subLabel: "room" },
        { id: 2, number: "5M+", label: "Happy", subLabel: "Customers" },
        { id: 3, number: "23+", label: "Certificate of", subLabel: "Merit" },
    ];

    return (
        <section className="bg-[#E5555C] w-full py-16 px-6 sm:px-8 lg:px-12 font-sans text-white">
            <div className="max-w-7xl mx-auto">

                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">

                    <div className="flex-1 w-full lg:w-auto text-center lg:text-left">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal leading-snug mb-6 max-w-md mx-auto lg:mx-0">
                            Rentals with the best service and quality always
                        </h2>

                        {/* Divider Line */}
                        <div className="w-full h-[1px] bg-white/40 mb-6"></div>

                        {/* Rating */}
                        <div className="flex items-center justify-center lg:justify-start gap-4">
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className="w-6 h-6 fill-yellow-400 text-yellow-400"
                                    />
                                ))}
                            </div>
                            <span className="text-xl font-medium">5.0</span>
                        </div>
                    </div>

                    <div className="flex-1 flex justify-center items-center w-full">
                        <div className="flex items-center">

                            {stats.map((stat, index) => (
                                <div
                                    key={stat.id}
                                    className={`
                    relative flex flex-col items-center justify-center text-center
                    border border-white/60 rounded-full
                    /* Circle Size Responsive */
                    w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48
                    /* Background color needed to hide the border of the circle behind it */
                    bg-[#E5555C]
                    /* Negative Margin creates the overlap effect */
                    ${index !== 0 ? '-ml-6 md:-ml-8 lg:-ml-10' : ''}
                    /* Z-Index ensures the correct stacking order (left on top) */
                    z-${(3 - index) * 10}
                  `}
                                >
                  <span className="text-3xl md:text-4xl lg:text-5xl font-light mb-1 md:mb-2">
                    {stat.number}
                  </span>
                                    <div className="text-xs md:text-sm font-light opacity-90 leading-tight">
                                        <p>{stat.label}</p>
                                        <p>{stat.subLabel}</p>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default StatsSection;