import axios from "axios"
import { SITE_ADRESS, GITHUB_USERNAME } from "../../constants/constants";

const API = axios.create({
  baseURL: `${SITE_ADRESS}/api/`,
  withCredentials: false
});

// get
export const getAllPost = () => API.get('/blogposts');
export const getPostsByCategory = (categorySlug, count) => API.get('/blogposts/category/'+categorySlug, count);
export const getGitHub = () => API.get('https://api.github.com/users/'+GITHUB_USERNAME);
export const getAPostBySlug = (slug) => API.get('/blogposts/'+slug);
export const getAllPages = () => API.get('/pages');
export const getAPageBySlug = (slug) => API.get('/pages/'+slug);
export const nextPost = (id) => API.get('/blogposts/next/'+id);
export const prevPost = (id) => API.get('/blogposts/prev/'+id);
export const fetchCommentByPostID = (postID) => API.get('/comment/'+postID);
export const getCountofComment = (postID) => API.get('/comment/count/'+postID);
export const getCountofPosts = () => API.get('/blogposts/count');
export const getCountofCategories = () => API.get('/categories/count');
export const addComment = (postID, data) => API.post(`/comment/${postID}`, data);
export const getAllCategories = () => API.get('/categories');
export const getAllComments = () => API.get('/comment');
export const getACategoryBySlug = (slug) => API.get('/categories/'+slug);
export const getAllSettings = () => API.get('/settings');

// posts
export const addAPost = (data) => API.post('/blogposts', data);
export const addAPage = (data) => API.post('/pages', data);
export const addACategory = (data) => API.post('/categories', data);
export const uploadImage = (data) => API.post('/uploadimage', data);

// delete
export const deleteAPost = (postID) => API.delete('/blogposts/'+postID);
export const deleteAPage = (pageID) => API.delete('/pages/'+pageID);
export const deleteACategory = (categoryID) => API.delete('/categories/'+categoryID);
export const deleteAComment = (commentID) => API.delete('/comment/'+commentID);

// update
export const editAPost = (slug, data) => API.put('/blogposts/'+slug, data);
export const editAPage = (slug, data) => API.put('/pages/'+slug, data);
export const editACategory = (slug, data) => API.put('/categories/'+slug, data);
export const updateSettings = (data) => API.put('/settings', data);
