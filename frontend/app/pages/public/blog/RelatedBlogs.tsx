import React, {useEffect, useState} from 'react';
import {blogs} from "~/pages/public/blog/blogActions";
import {DateDisplay} from "~/utils/DateDisplay";
import {Skeleton} from "~/components/ui/skeleton";

interface images {
    "url": string,
    "publicId": string,
    "_id": string
}
interface BlogPost {
    _id: string;
    title: string;
    images: images[];
    createdAt: string;
}

interface BlogResponse {
    blogs: BlogPost[];
}

const RelatedBlogs = () => {
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // 4. Update fetch function to accept page number
    async function fetchBlogPosts(page = 1) {
        setIsLoading(true);
        try {
            const response: BlogResponse = await blogs(page);
            setBlogPosts(response.blogs || []);
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }

    // Initial load
    useEffect(() => {
        fetchBlogPosts(1);
    }, []);

    return (
        <section className=" py-16 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-7xl mx-auto">

                {/* Section Heading */}
                <h2 className="text-3xl md:text-4xl font-serif text-[#1A1A1A] mb-10">
                    Other Related Blogs
                </h2>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {isLoading ? (
                        Array.from({length: 3}).map((_, index) => (
                            <div key={index} className="flex flex-col h-full">
                                <Skeleton className="w-full h-64 mb-6 rounded-md"/>
                                <div className="flex flex-col flex-grow gap-4">
                                    <div className="space-y-2">
                                        <Skeleton className="h-7 w-full"/>
                                        <Skeleton className="h-7 w-2/3"/>
                                    </div>
                                    <Skeleton className="h-4 w-24 mt-auto"/>
                                </div>
                            </div>
                        ))
                    ) : (
                        blogPosts.length > 0 && blogPosts.slice(0, 3).map((post) => (
                            <article key={post._id} className="group cursor-pointer flex flex-col h-full">

                                {/* Image Container */}
                                <div className="overflow-hidden w-full h-64 mb-5 bg-gray-200">
                                    <img
                                        src={post.images[0].url}
                                        alt={post.title}
                                        className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>

                                {/* Text Content */}
                                <div className="flex flex-col flex-grow">
                                    <h3 className="text-xl font-serif text-[#1A1A1A] leading-snug mb-3 group-hover:text-gray-600 transition-colors">
                                        {post.title}
                                    </h3>

                                    <DateDisplay
                                        value={post.createdAt}
                                        className="text-gray-400 text-xs font-medium mt-auto"
                                    />
                                </div>

                            </article>
                        )))
                    }

                </div>
            </div>
        </section>
    );
};

export default RelatedBlogs;