import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

api.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("usertoken");
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  (err) => {
    return Promise.reject(err);
  }
);

api.interceptors.response.use(
    (response)=>{
        return response;
    },
    (err)=>{
        if(err.response.status===401){
            localStorage.removeItem('usertoken');
            window.location.href='/login';
        }
        return Promise.reject(err);
    }
);

export const registerUser = async (body) => {
  try {
    return await api.post("/register", body);
  } catch (err) {
    console.log("Error in register api");
  }
};

export const loginUser = async (body) => {
  try {
    return await api.post("/login", body);
  } catch (err) {
    console.log("Error in login api");
  }
};

export const get = async ()=>{
    try{
        return await api.get("/");
    } catch(err){
        console.log("Error in get api");
    }
}