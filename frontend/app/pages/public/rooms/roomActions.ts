import axios, {endpoints} from 'app/utils/axios';

export const rooms = async (page = 1): Promise<number> => {
    const res = await axios.get(`${endpoints.rooms.allRooms}?page=${page}&limit=10`);
    const {data} = res;
    return data;
}

export const room = async (id: string | undefined) => {
    const res = await axios.get(`${endpoints.rooms.singleRoom}/${id}`);
    const {data} = res;
    console.log(data);
    return data;
}