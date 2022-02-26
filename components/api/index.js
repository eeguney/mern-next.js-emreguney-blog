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
export const fetchCommentByPostID = (postID) => API.get('/comment/'+postID);
export const getCountofComment = (postID) => API.get('/comment/count/'+postID);
export const addComment = (postID, data) => API.post(`/comment/${postID}`, data);
