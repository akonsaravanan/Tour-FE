import axios from "axios";
// const APIbaseUrl = "http://localhost:2000";

const devEnv = process.env.NODE_ENV === "development";
const { REACT_APP_DEV_API, REACT_APP_PROD_API } = process.env;

// console.log(process.env.REACT_APP_DEV_API, devEnv, process.env.REACT_APP_PROD_API);

const API = axios.create({ baseURL: `${devEnv ? REACT_APP_DEV_API : REACT_APP_PROD_API}` });

/* export const signIn = async (formData) => {
  const response = await axios.post(`${APIbaseUrl}/users/signin`, formData);
  return response;
}; */

API.interceptors.request.use((req) => {
  if (localStorage.getItem("user-profile")) {
    const token = JSON.parse(localStorage.getItem("user-profile")).token;
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const signIn = async (formData) => {
  const response = await API.post("/users/signin", formData);
  return response;
};
export const signUp = async (formData) => {
  const response = await API.post("/users/signup", formData);
  return response;
};

export const createTour = async (tourData) => {
  const response = await API.post("/tour", tourData);
  return response;
};
export const getTours = async (page) => {
  const response = await API.get(`/tour?page=${page}`);
  return response;
};
export const getSingleTour = async (tourId) => {
  const response = await API.get(`/tour/${tourId}`); //tour id not a user id
  return response;
};
export const updateTour = async (updatedTourData, tourId) => {
  const response = await API.patch(`/tour/${tourId}`, updatedTourData); //tour id not a user id
  return response;
};
export const deleteTour = async (tourId) => {
  const response = await API.delete(`/tour/${tourId}`); //tour id not a user id
  return response;
};
export const getToursByUser = async (userId) => {
  const response = await API.get(`/tour/userTours/${userId}`); //user id not a tour id
  return response;
};
export const getToursBySearch = async (tourTitle) => {
  const response = await API.get(`/tour/q?title=${tourTitle}`);
  console.log(response);
  return response;
};
export const getToursByTag = async (tag) => {
  const response = await API.get(`/tour/tag/${tag}`);
  return response;
};
export const getRelatedToursByTag = async (tags) => {
  const response = await API.post("/tour/relatedTours", tags);
  return response;
};
export const getLikeTours = async (id) => {
  const response = await API.patch(`/tour/like/${id}`);
  // console.log(response);
  return response;
};
