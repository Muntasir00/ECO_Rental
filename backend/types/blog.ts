export interface BlogImage {
  url: string;
  publicId: string;
}

export interface CreateBlogTypes {
  title: string;
  content: string;
  images: BlogImage[];
}
