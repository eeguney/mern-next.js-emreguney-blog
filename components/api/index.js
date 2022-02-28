import axios from "axios"
import { SITE_ADRESS, GITHUB_USERNAME } from "../../constants/constants";

const API = axios.create({
  baseURL: `${SITE_ADRESS}/api/`,
  withCredentials: false
});

export const getAllPost = () => API.get('/blogposts');
export const getGitHub = () => API.get('https://api.github.com/users/'+GITHUB_USERNAME);
export const getAPostBySlug = (slug) => API.get('/blogposts/'+slug);
export const nextPost = (id) => API.get('/blogposts/next/'+id);
export const prevPost = (id) => API.get('/blogposts/prev/'+id);
export const fetchCommentByPostID = (postID) => API.get('/comment/'+postID);
export const getCountofComment = (postID) => API.get('/comment/count/'+postID);
export const getCountofPosts = () => API.get('/blogposts/count');
export const addComment = (postID, data) => API.post(`/comment/${postID}`, data);
