// src/api/blogApi.js
import axiosInstance from "./axiosInstance";

// Create Blog API
export const createBlogApi = async (blogData, thumbnailFile) => {
  try {
    // Create FormData for multipart/form-data
    const formData = new FormData();
    
    formData.append('title', blogData.title);
    formData.append('description', blogData.description);

    formData.append('content', blogData.content || '');
    formData.append('keywords', blogData.keywords || '');
    formData.append('category', blogData.category || '');


    formData.append('status', blogData.status || 'published');
    
    // Handle tags array - convert to comma-separated string
    if (blogData.tags && blogData.tags.length > 0) {
      formData.append('tags', blogData.tags.join(','));
    }
    
    // Handle thumbnail file - only append if it's a File object
    if (thumbnailFile && thumbnailFile instanceof File) {
      formData.append('thumbnail', thumbnailFile);
    }

    // Use axiosInstance directly with proper headers
    const response = await axiosInstance.post('/blogs', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return {
      success: true,
      data: response.data,
      message: 'Blog created successfully!'
    };
  } catch (error) {
    console.error('Create blog error:', error);
    return {
      success: false,
      message: error.response?.data?.error || 'Failed to create blog',
      error: error.response?.data
    };
  }
};

// Update Blog API
export const updateBlogApi = async (blogId, blogData, thumbnailFile) => {
  try {
    const formData = new FormData();
    
    formData.append('title', blogData.title);
    formData.append('description', blogData.description);
    formData.append('content', blogData.content || '');
    formData.append('status', blogData.status || 'published');
    
    // Handle tags array
    if (blogData.tags && blogData.tags.length > 0) {
      formData.append('tags', blogData.tags.join(','));
    }
    
    // Handle thumbnail file - only append if it's a new File object
    if (thumbnailFile && thumbnailFile instanceof File) {
      formData.append('thumbnail', thumbnailFile);
    }

    // Use axiosInstance directly
    const response = await axiosInstance.put(`/blogs/${blogId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return {
      success: true,
      data: response.data,
      message: 'Blog updated successfully!'
    };
  } catch (error) {
    console.error('Update blog error:', error);
    return {
      success: false,
      message: error.response?.data?.error || 'Failed to update blog',
      error: error.response?.data
    };
  }
};

// Get All Blogs API
export const getBlogsApi = async (params = {}) => {
  try {
    const response = await axiosInstance.get('/blogs', { params });

    return {
      success: true,
      data: response.data,
      message: 'Blogs fetched successfully!'
    };
  } catch (error) {
    console.error('Get blogs error:', error);
    return {
      success: false,
      message: error.response?.data?.error || 'Failed to fetch blogs',
      error: error.response?.data
    };
  }
};

// Get Single Blog API
export const getBlogByIdApi = async (blogId) => {
  try {
    const response = await axiosInstance.get(`/blogs/${blogId}`);

    return {
      success: true,
      data: response.data,
      message: 'Blog fetched successfully!'
    };
  } catch (error) {
    console.error('Get blog error:', error);
    return {
      success: false,
      message: error.response?.data?.error || 'Failed to fetch blog',
      error: error.response?.data
    };
  }
};

// Delete Blog API
export const deleteBlogApi = async (blogId) => {
  try {
    const response = await axiosInstance.delete(`/blogs/${blogId}`);

    return {
      success: true,
      data: response.data,
      message: 'Blog deleted successfully!'
    };
  } catch (error) {
    console.error('Delete blog error:', error);
    return {
      success: false,
      message: error.response?.data?.error || 'Failed to delete blog',
      error: error.response?.data
    };
  }
};