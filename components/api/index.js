import axios from "axios"
import { SITE_ADRESS, GITHUB_USERNAME } from "../../constants/constants";

const API = axios.create({
  baseURL: `${SITE_ADRESS}/api/`,
  withCredentials: false
});

// get
export const getAllPost = () => API.get('/blogposts');
export const getGitHub = () => API.get('https://api.github.com/users/'+GITHUB_USERNAME);
export const getAPostBySlug = (slug) => API.get('/blogposts/'+slug);
export const getAllPages = () => API.get('/pages');
export const getAPageBySlug = (slug) => API.get('/pages/'+slug);
export const nextPost = (id) => API.get('/blogposts/next/'+id);
export const prevPost = (id) => API.get('/blogposts/prev/'+id);
export const fetchCommentByPostID = (postID) => API.get('/comment/'+postID);
export const getCountofComment = (postID) => API.get('/comment/count/'+postID);
export const getCountofPosts = () => API.get('/blogposts/count');
export const addComment = (postID, data) => API.post(`/comment/${postID}`, data);
export const getAllCategories = () => API.get('/categories');
export const getACategoryBySlug = (slug) => API.get('/categories/'+slug);

// posts
export const addAPost = (data) => API.post('/blogposts', data);
