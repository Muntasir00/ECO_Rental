import axios, { endpoints } from 'app/utils/axios';

export const blogs = async (page: number) =>{
    const res = await axios.get(endpoints.blogs.allBlogs);
    const { data} = res;
    return data.blogs;
}

export const blog = async (id: number) =>{
    const res = await axios.get(`${endpoints.blogs.blog}/${id}`);
    const { data} = res;
    console.log(data);
    return data;
}