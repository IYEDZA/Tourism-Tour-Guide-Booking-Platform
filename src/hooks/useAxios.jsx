import axios from "axios";
// http://localhost:3000
const axiosInstance = axios.create({
    baseURL: `https://my-as-12-tourist-server.vercel.app`
})

const useAxios = () => {
    
    return axiosInstance;
};

export default useAxios;