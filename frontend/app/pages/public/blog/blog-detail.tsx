import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router'; // Works for v6 and v7
import RelatedBlogs from "~/pages/public/blog/RelatedBlogs";
import {DateDisplay} from "~/utils/DateDisplay";
import {Skeleton} from "~/components/ui/skeleton";
import {blog as singleBlog} from "~/pages/public/blog/blogActions"; // Assuming you have an API action

// 1. Define Interface
interface BlogPost {
    _id: string;
    title: string;
    content: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
}

const BlogDetail = () => {
    const {id} = useParams<{ id: string }>();
    const [blog, setBlog] = useState<BlogPost | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 4. Fetch Data
    useEffect(() => {
        const fetchSingleBlog = async () => {
            if (!id) return;

            setIsLoading(true);
            try {
                const response = await singleBlog(id); // Update this URL
                console.log(response);

                setBlog(response);
            } catch (err) {
                console.error(err);
                setError("Failed to load blog details.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchSingleBlog();
    }, [id]);

    // 5. Loading State (Skeleton)
    if (isLoading) {
        return (
            <div className="bg-white min-h-screen py-12 px-4 sm:px-6 font-sans">
                <article className="max-w-7xl mx-auto">
                    {/* Image Skeleton */}
                    <Skeleton className="w-full h-[300px] md:h-[400px] lg:h-[500px] mb-10 rounded-lg"/>

                    {/* Header Skeleton */}
                    <div className="mb-10 space-y-4">
                        <Skeleton className="h-10 md:h-12 w-3/4"/>
                        <Skeleton className="h-10 md:h-12 w-1/2"/>
                        <Skeleton className="h-4 w-32 mt-2"/>
                    </div>

                    {/* Content Skeleton */}
                    <div className="space-y-4">
                        <Skeleton className="h-4 w-full"/>
                        <Skeleton className="h-4 w-full"/>
                        <Skeleton className="h-4 w-[90%]"/>
                        <Skeleton className="h-4 w-full"/>
                        <Skeleton className="h-4 w-[80%]"/>
                    </div>
                </article>
            </div>
        );
    }

    // 6. Error State
    if (error || !blog) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center text-red-500">
                {error || "Blog not found"}
            </div>
        );
    }

    // 7. Loaded State (Your UI)
    return (
        <div className="bg-white min-h-screen py-12 px-4 sm:px-6 font-sans">
            <article className="max-w-7xl mx-auto">

                {/* Feature Image */}
                <div
                    className="w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden mb-10 rounded-lg bg-gray-100">
                    <img
                        src={blog.imageUrl}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Header Section */}
                <header className="mb-10">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-[#191818] leading-tight mb-4">
                        {blog.title}
                    </h1>

                    <DateDisplay
                        value={blog.createdAt}
                        className="text-sm text-gray-500 font-normal"
                    />
                </header>

                {/* Content Body */}
                <div
                    className="text-base md:text-xl text-[#555555] leading-8 md:leading-9 font-medium space-y-8 text-justify md:text-left">
                    {/*
                       NOTE: If your content is plain text (like "joy"), just render it.
                       If your content is HTML (from a rich text editor), use dangerouslySetInnerHTML:
                       <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                    */}
                    <p>{blog.content}</p>
                </div>

            </article>

            {/* Pass current ID to exclude it from related list if needed */}
            <RelatedBlogs/>

        </div>
    );
};

export default BlogDetail;