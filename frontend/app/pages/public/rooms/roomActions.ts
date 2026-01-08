import axios, {endpoints} from 'app/utils/axios';

export const rooms = async (page = 1): Promise<number> => {
    const res = await axios.get(`${endpoints.rooms.allRooms}?page=${page}&limit=10`);
    const {data} = res;
    return data;
}

export const room = async (id: string | undefined) => {
    const res = await axios.get(`${endpoints.rooms.singleRoom}/${id}`);
    const {data} = res;
    return data;
}
export const availability = async (id: string, start: string, end: string) => {
    const res = await axios.get(`${endpoints.rooms.availability}/${id}/availability`, {
        params: {
            start: start,
            end: end
        }
    });
    const {data} = res;
    return data;
}
export const bookings = async (id: string, bookingData:any) => {
    const res = await axios.post(`${endpoints.rooms.bookings}/${id}`, bookingData);
    const {data} = res;
    return data;
}
export const myBookings = async () => {
    const res = await axios.get(`${endpoints.rooms.bookings}/my-bookings`);
    const {data} = res;
    return data;
}
interface SearchParams {
    location?: string;
    bedroom?: string | number; // Can be string from URL or number from state
    checkIn: string;
    checkOut: string;
    page?: number;
    limit?: number;
}
export const searchRooms = async ({location, bedroom, checkIn, checkOut, page}:SearchParams) => {
    const res = await axios.get(`${endpoints.rooms.allRooms}/search`,{
        params: {
            location:location,
            bedroom:bedroom,
            checkIn:checkIn,
            checkOut:checkOut,
            page: page,
            limit: 10
        }
    });
    const {data} = res;
    console.log(data);
    return data;
}