import axios from "axios"

const API = axios.create({
  baseURL: 'http://localhost:3000/api/',
  withCredentials: false
});

export const getAllPost = () => API.get('/blogposts');
export const getGitHub = () => API.get('https://api.github.com/users/eeguney');
export const getAPostBySlug = (slug) => API.get('/blogposts/'+slug);
export const nextPost = (id) => API.get('/blogposts/next/'+id);
export const prevPost = (id) => API.get('/blogposts/prev/'+id);

