import BlogHero from "~/pages/public/blog/BlogHero";
import NewsSection from "~/pages/public/blog/NewsSection";
import BlogGrid from "~/pages/public/blog/BlogGrid";

export default function BlogPageView() {
    return (
        <div className="min-h-screen">
            <BlogHero />
            <NewsSection />
            <BlogGrid />
        </div>
    )
}