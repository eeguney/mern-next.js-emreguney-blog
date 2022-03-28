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
export const getAPostBySlug = (slug) => API.get('/blogposts/param/'+slug);
export const getAllPages = () => API.get('/pages');
export const getAPageBySlug = (slug) => API.get('/pages/'+slug);
export const nextPost = (id) => API.get('/blogposts/next/'+id);
export const prevPost = (id) => API.get('/blogposts/prev/'+id);
export const fetchCommentByPostID = (postID) => API.get('/comments/'+postID);
export const getCountofComment = (postID) => API.get('/comments/count/'+postID);
export const getCountofPosts = () => API.get('/blogposts/count');
export const getCountofCategories = () => API.get('/categories/count');
export const addComment = (postID, data) => API.post(`/comments/${postID}`, data);
export const getAllCategories = () => API.get('/categories');
export const getAllComments = () => API.get('/comments');
export const getACategoryBySlug = (slug) => API.get('/categories/param/'+slug);
export const getAllSettings = () => API.get('/settings');

// posts
export const addAPost = (data) => API.post('/blogposts', data);
export const addAPage = (data) => API.post('/pages', data);
export const addACategory = (data) => API.post('/categories', data);
export const uploadImage = (data) => API.post('/uploadimage', data);

// delete
export const deleteAPost = (postID) => API.delete('/blogposts/param/'+postID);
export const deleteAPage = (pageID) => API.delete('/pages/'+pageID);
export const deleteACategory = (categoryID) => API.delete('/categories/param/'+categoryID);
export const deleteAComment = (commentID) => API.delete('/comment/'+commentID);

// update
export const editAPost = (slug, data) => API.put('/blogposts/param'+slug, data);
export const editAPage = (slug, data) => API.put('/pages/'+slug, data);
export const editACategory = (slug, data) => API.put('/categories/'+slug, data);
export const updateSettings = (data) => API.put('/settings', data);
