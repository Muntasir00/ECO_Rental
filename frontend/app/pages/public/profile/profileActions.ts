import axios, {endpoints} from "~/utils/axios";

export const profiles = async () => {
    const res = await axios.get(`${endpoints.user.profile}`);
    const {data} = res;
    return data;
}
export const profileUpdate = async (values:FormData) => {
    const res = await axios.put(`${endpoints.user.profileUpdate}`, values);
    const {data} = res;
    return data;
}