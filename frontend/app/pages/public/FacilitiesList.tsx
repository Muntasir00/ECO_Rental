import React from 'react';
import { ArrowRight } from 'lucide-react';

const FacilitiesList = () => {
    const facilities = [
        {
            id: "01",
            title: "Indoor Swimming Pool",
            description: "It is a long established fact that a reader will be distracted by the readable content of a page",
            image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: "02",
            title: "Gym Training Ground",
            description: "It is a long established fact that a reader will be distracted by the readable content of a page",
            image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: "03",
            title: "Caffe & Restaurant",
            description: "It is a long established fact that a reader will be distracted by the readable content of a page",
            image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
    ];

    return (
        <section className="bg-[#F5F5F5] py-16 px-4 sm:px-6 lg:px-8 font-sans text-[#1A1A1A]">
            <div className="max-w-7xl mx-auto">

                {/* =======================
            HEADER SECTION
        ======================== */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
                    <h2 className="text-3xl md:text-4xl lg:text-[46px] text-[#191818] font-serif leading-tight max-w-lg">
                        Enjoy complete and best <br /> quality facilities
                    </h2>

                    <button className="bg-[#E5555C] hover:bg-[#d4444b] text-white px-8 py-3 rounded-sm font-medium transition-colors shadow-md shadow-red-100">
                        See more
                    </button>
                </div>

                {/* =======================
            FACILITIES LIST
        ======================== */}
                <div className="border-t border-gray-300">
                    {facilities.map((item) => (
                        <div
                            key={item.id}
                            className="group py-12 border-b border-gray-300 transition-colors hover:bg-black/5 md:hover:bg-transparent"
                        >
                            {/*
                  Grid Layout:
                  Mobile: 1 column
                  Desktop: 12 columns
                  (Image: 5 cols | Number: 1 col | Content: 6 cols)
              */}
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

                                {/* 1. Image */}
                                <div className="md:col-span-5 h-64 md:h-72 w-full overflow-hidden rounded-sm bg-gray-200">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>

                                {/* 2. Number (Desktop positioning) */}
                                <div className="md:col-span-1 hidden md:block">
                  <span className="text-xl font-serif text-black block mt-2">
                    {item.id}
                  </span>
                                </div>

                                {/* 3. Text Content */}
                                <div className="md:col-span-6 flex flex-col h-full justify-between">

                                    <div>
                                        {/* Mobile Number (Visible only on small screens) */}
                                        <span className="md:hidden text-lg font-serif text-black block mb-2">
                      {item.id}
                    </span>

                                        <h3 className="text-2xl font-serif font-medium mb-4 text-black group-hover:text-[#E5555C] transition-colors">
                                            {item.title}
                                        </h3>

                                        <p className="text-gray-500 leading-relaxed max-w-md">
                                            {item.description}
                                        </p>
                                    </div>

                                    {/* Arrow Icon */}
                                    <div className="mt-8 md:mt-12">
                                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full cursor-pointer transition-transform duration-300 group-hover:translate-x-2">
                                            <ArrowRight className="w-8 h-8 text-[#E5555C]" strokeWidth={1.5} />
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default FacilitiesList;