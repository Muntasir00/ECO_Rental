import React from 'react';
import { ArrowRight } from 'lucide-react';

const BlogSection = () => {
    const posts = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Aerial Golf Course
            title: "New facilities : Large golf course at the Zerra hotel",
            date: "25 May 2023"
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            title: "Coming soon! a posh supermarket near the hotel",
            date: "12 May 2023"
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Modern Hall/Lobby
            title: "Webinar event Mental training for young people to develop",
            date: "15 Apr 2023"
        }
    ];

    return (
        <section className="bg-[#FAFAFA] py-16 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-7xl mx-auto">

                {/* =======================
            HEADER SECTION
        ======================== */}
                <div className="flex justify-between items-end mb-6">
                    <h2 className="text-3xl md:text-4xl font-serif text-[#1A1A1A]">
                        Blog
                    </h2>

                    <a href="#" className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors group">
                        View more
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </a>
                </div>

                {/* Divider Line */}
                <hr className="border-gray-200 mb-10" />

                {/* =======================
            BLOG GRID
        ======================== */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">

                    {posts.map((post) => (
                        <article key={post.id} className="group cursor-pointer flex flex-col h-full">

                            {/* Image Container */}
                            <div className="overflow-hidden w-full h-56 md:h-64 mb-5 bg-gray-100 rounded-sm">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>

                            {/* Text Content */}
                            <div className="flex flex-col flex-grow">
                                <h3 className="text-xl font-serif text-[#1A1A1A] leading-snug mb-3 group-hover:text-gray-600 transition-colors line-clamp-2">
                                    {post.title}
                                </h3>

                                <time className="text-gray-400 text-xs font-medium mt-auto">
                                    {post.date}
                                </time>
                            </div>

                        </article>
                    ))}

                </div>
            </div>
        </section>
    );
};

export default BlogSection;