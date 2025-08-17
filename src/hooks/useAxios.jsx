import axios from "axios";

// http://localhost:3000
const axiosInstance = axios.create({
     baseURL: `https://my-as-12-tourist-server.vercel.app`
    //  baseURL: `http://localhost:3000`,
    // withCredentials: true,
})

const useAxios = () => {
    
    return axiosInstance;
};

export default useAxios;