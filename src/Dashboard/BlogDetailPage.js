import React, { useState, useEffect } from 'react';
import { Spin, message, Button } from 'antd';
import { 
  ArrowLeftOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  UserOutlined
} from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { getBlogByIdApi } from '../services/blog';

const BlogDetailPage = () => {
  let { id: blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()
  const onBack = ()=>{
    navigate('/blog')
  }
  const fetchBlog = async () => {
    if (!blogId) {
      setError('Blog ID not provided');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await getBlogByIdApi(blogId);
      
      if (response.success && response.data) {
        setBlog(response.data);
      } else {
        setError(response.message || 'Blog not found');
        message.error(response.message || 'Blog not found');
      }
    } catch (err) {
      console.error('Error fetching blog:', err);
      setError('Failed to load blog. Please try again.');
      message.error('Failed to load blog. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  const calculateReadTime = (content) => {
    if (!content) return 1;
    const wordsPerMinute = 200;
    const textContent = content.replace(/<[^>]*>/g, '');
    const wordCount = textContent.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute) || 1;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Recently';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <Spin size="large" />
          <p className="mt-4 text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center max-w-md mx-auto p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Article Not Found</h2>
          <p className="text-gray-600 mb-8">{error}</p>
          <Button 
            type="primary" 
            onClick={onBack} 
            icon={<ArrowLeftOutlined />}
            size="large"
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const readTime = calculateReadTime(blog.content);
  const publishDate = formatDate(blog.createdAt);

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Navigation */}
      <nav className="border-b border-gray-100 bg-white sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Button 
            type="text" 
            icon={<ArrowLeftOutlined />} 
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900"
          >
            Back to Articles
          </Button>
        </div>
      </nav>

      {/* Article Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <article>
          {/* Article Header */}
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight max-w-4xl mx-auto">
              {blog.title}
            </h1>
            
            {/* Meta Information */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-600 text-sm mb-8">
              <div className="flex items-center gap-2">
                <UserOutlined />
                <span>{blog.author || 'Admin'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarOutlined />
                <span>{publishDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <ClockCircleOutlined />
                <span>{readTime} minute read</span>
              </div>
            </div>

            {/* Description */}
            {blog.description && (
              <div className="max-w-3xl mx-auto">
                <p className="text-lg text-gray-700 leading-relaxed italic border-l-4 border-blue-500 pl-6 bg-blue-50 py-4 rounded-r-lg">
                  {blog.description}
                </p>
              </div>
            )}
          </header>

          {/* Hero Image */}
          {blog.thumbnail && (
            <div className="mb-12">
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="w-full h-80 md:h-96 object-cover rounded-lg"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Article Body */}
          <div className="max-w-3xl mx-auto">
            <div 
              className="article-content"
              dangerouslySetInnerHTML={{ __html: blog.content || '<p>Content not available.</p>' }}
            />
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="max-w-3xl mx-auto mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Author Info */}
          <div className="max-w-3xl mx-auto mt-12 pt-8 border-t border-gray-200">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  {(blog.author || 'Admin').charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {blog.author || 'Admin'}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Cybersecurity expert dedicated to sharing knowledge and helping others succeed in the field of information security.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>

      <style jsx>{`
        .article-content {
          line-height: 1.8;
          font-size: 18px;
          color: #374151;
        }
        
        .article-content h1,
        .article-content h2,
        .article-content h3,
        .article-content h4,
        .article-content h5,
        .article-content h6 {
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          font-weight: 600;
          color: #1f2937;
          line-height: 1.3;
        }
        
        .article-content h1 { 
          font-size: 2.25rem;
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 0.75rem;
        }
        
        .article-content h2 { 
          font-size: 1.875rem;
        }
        
        .article-content h3 { 
          font-size: 1.5rem;
        }
        
        .article-content p {
          margin-bottom: 1.5rem;
          line-height: 1.8;
        }
        
        .article-content ul,
        .article-content ol {
          margin-bottom: 1.5rem;
          padding-left: 2rem;
        }
        
        .article-content li {
          margin-bottom: 0.75rem;
          line-height: 1.7;
        }
        
        .article-content blockquote {
          border-left: 4px solid #3b82f6;
          background: #f8fafc;
          padding: 1.5rem;
          margin: 2rem 0;
          border-radius: 0.5rem;
          font-style: italic;
          color: #4b5563;
        }
        
        .article-content code {
          background: #f3f4f6;
          color: #dc2626;
          padding: 0.25rem 0.5rem;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          font-weight: 500;
        }
        
        .article-content pre {
          background: #1f2937;
          color: #f9fafb;
          padding: 1.5rem;
          border-radius: 0.75rem;
          overflow-x: auto;
          margin: 2rem 0;
        }
        
        .article-content pre code {
          background: none;
          color: inherit;
          padding: 0;
          font-size: 0.875rem;
        }
        
        .article-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.75rem;
          margin: 2rem 0;
        }
        
        .article-content a {
          color: #3b82f6;
          text-decoration: underline;
          text-decoration-color: #93c5fd;
          text-underline-offset: 2px;
          transition: all 0.2s ease;
        }
        
        .article-content a:hover {
          color: #2563eb;
          text-decoration-color: #3b82f6;
        }
        
        .article-content strong {
          font-weight: 600;
          color: #1f2937;
        }
        
        .article-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 2rem 0;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          overflow: hidden;
        }
        
        .article-content th,
        .article-content td {
          padding: 0.75rem 1rem;
          text-align: left;
          border-bottom: 1px solid #f3f4f6;
        }
        
        .article-content th {
          background: #f9fafb;
          font-weight: 600;
          color: #1f2937;
        }
        
        .article-content hr {
          border: none;
          height: 1px;
          background: #e5e7eb;
          margin: 3rem 0;
        }
        
        @media (max-width: 768px) {
          .article-content {
            font-size: 16px;
          }
          
          .article-content h1 { font-size: 1.875rem; }
          .article-content h2 { font-size: 1.5rem; }
          .article-content h3 { font-size: 1.25rem; }
        }
      `}</style>
    </div>
  );
};

export default BlogDetailPage;