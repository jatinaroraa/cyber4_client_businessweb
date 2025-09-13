import React, { useEffect, useState } from "react";
import {
  ChevronDown,
  Play,
  Users,
  Shield,
  Award,
  Star,
  ArrowRight,
  Menu,
  X,
  Check,
  Lock,
  Code,
  Database,
  Tag,
  Calendar,
  User,
  Clock,
  ArrowLeft, Share2, BookmarkPlus, ThumbsUp, MessageCircle, Eye
} from "lucide-react";
import { Card, Avatar, Spin, message, Empty, Button } from 'antd';
import { 
  UserOutlined, 
  CalendarOutlined, 
  ClockCircleOutlined, 
  EyeOutlined,
  TagsOutlined,
  ArrowRightOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import { getBlogsApi } from '../../services/blog';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import NavBar from "../../NavBar/NavBar";


export default function BlogPage() {
    const navigate = useNavigate()
    const BlogCard = ({ blog, onBlogClick }) => {
  // Map API response fields to component props
  const {
    _id,
    title,
    description, // Using description as excerpt
    author = 'Admin',
    createdAt,
    thumbnail,
    tags = [],
    status,
    content
  } = blog;

  // Calculate read time based on content length (rough estimation)
  const calculateReadTime = (content) => {
    if (!content) return 1;
    const wordsPerMinute = 200;
    const textContent = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
    const wordCount = textContent.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute) || 1;
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Recently';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };
   const handleReadMore = () => {
    navigate(`/blog/${blog._id || blog.id}`);
  };

  const readTime = calculateReadTime(content);
  const publishDate = formatDate(createdAt);

  return (
    <Card
      hoverable
      className="h-full flex flex-col overflow-hidden group transition-all duration-300"
      onClick={() => onBlogClick && onBlogClick(blog)}
      cover={
        <div className="relative overflow-hidden h-48">
          <img
            src={thumbnail || 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=240&fit=crop'}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=240&fit=crop';
            }}
          />
          <div className="absolute top-4 left-4">
            <Tag color={status === 'published' ? 'green' : 'orange'} className="font-semibold">
              {status === 'published' ? 'Published' : 'Draft'}
            </Tag>
          </div>
        </div>
      }
    >
      <div className="flex flex-col h-full">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>

        {/* Description/Excerpt */}
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed flex-grow">
          {description}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 3).map((tag, index) => (
              <Tag
                key={index}
                icon={<TagsOutlined />}
                color="blue"
                className="text-xs"
              >
         
              </Tag>
            ))}
            {tags.length > 3 && (
              <Tag className="text-xs" color="default">
                +{tags.length - 3} more
              </Tag>
            )}
          </div>
        )}

        {/* Meta Information */}
        {/* <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <UserOutlined className="mr-1" />
              <span>{author}</span>
            </div>
            <div className="flex items-center">
              <CalendarOutlined className="mr-1" />
              <span>{publishDate}</span>
            </div>
          </div>
          <div className="flex items-center">
            <ClockCircleOutlined className="mr-1" />
            <span>{readTime} min read</span>
          </div>
        </div> */}

        {/* Read More Button */}
        <Button 
        onClick={()=>handleReadMore()}
          type="link" 
          className="p-0 h-auto font-semibold flex items-center justify-start hover:text-blue-600 transition-colors mt-auto"
          icon={<EyeOutlined />}
        >
          Read More
          <ArrowRightOutlined className="ml-2 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </Card>
  );
};
  // Sample blog data - replace with your actual blog data
  const blogPosts = [
     {
    id: 1,
    title: "Getting Started with Cybersecurity: A Complete Beginner's Guide",
    excerpt: "Learn the fundamentals of cybersecurity, from basic concepts to essential tools and techniques. Perfect for those starting their journey in information security.",
    author: "Cyberb4 Team",
    publishDate: "Jan 15, 2025",
    readTime: 8,
    category: "Beginner Guide",
    imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=240&fit=crop",
    tags: ["Cybersecurity", "Beginner", "Career", "Fundamentals"]
  },
  {
    id: 2,
    title: "Top 10 Cybersecurity Certifications for 2025",
    excerpt: "Discover the most valuable cybersecurity certifications that can boost your career prospects and earning potential in the current job market.",
    author: "Security Expert",
    publishDate: "Jan 12, 2025",
    readTime: 12,
    category: "Certifications",
    imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=240&fit=crop",
    tags: ["Certifications", "Career Growth", "Professional Development"]
  },
  {
    id: 3,
    title: "How to Ace Your Cybersecurity Interview: Tips from Industry Experts",
    excerpt: "Master the art of cybersecurity interviews with proven strategies, common questions, and expert advice to land your dream job.",
    author: "Interview Coach",
    publishDate: "Jan 10, 2025",
    readTime: 10,
    category: "Interview Tips",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=240&fit=crop",
    tags: ["Interview", "Job Search", "Career Tips", "HR"]
  },
  {
    id: 4,
    title: "Understanding Data Privacy Laws: GDPR, CCPA, and Beyond",
    excerpt: "Navigate the complex landscape of data privacy regulations and learn how to ensure compliance in your organization.",
    author: "Privacy Consultant",
    publishDate: "Jan 8, 2025",
    readTime: 15,
    category: "Data Privacy",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=240&fit=crop",
    tags: ["GDPR", "CCPA", "Privacy", "Compliance", "Legal"]
  },
  {
    id: 5,
    title: "Building Your First SOC: Essential Tools and Technologies",
    excerpt: "A comprehensive guide to setting up a Security Operations Center, including must-have tools, technologies, and best practices.",
    author: "SOC Manager",
    publishDate: "Jan 5, 2025",
    readTime: 18,
    category: "SOC Operations",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=240&fit=crop",
    tags: ["SOC", "Security Operations", "Tools", "Technology"]
  },
  {
    id: 6,
    title: "Incident Response Planning: A Step-by-Step Framework",
    excerpt: "Learn how to create an effective incident response plan that minimizes damage and ensures quick recovery from security breaches.",
    author: "Incident Manager",
    publishDate: "Jan 3, 2025",
    readTime: 14,
    category: "Incident Response",
    imageUrl: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=400&h=240&fit=crop",
    tags: ["Incident Response", "Planning", "Security", "Best Practices"]
  },
  {
    id: 7,
    title: "Zero Trust Architecture: The Future of Network Security",
    excerpt: "Explore how Zero Trust principles are revolutionizing cybersecurity strategies and why traditional perimeter-based security is no longer sufficient in today's threat landscape.",
    author: "Network Security Analyst",
    publishDate: "Dec 28, 2024",
    readTime: 11,
    category: "Network Security",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=240&fit=crop",
    tags: ["Zero Trust", "Network Security", "Architecture", "Modern Security"]
  },
  {
    id: 8,
    title: "AI and Machine Learning in Cybersecurity: Opportunities and Challenges",
    excerpt: "Discover how artificial intelligence is transforming threat detection and response, while understanding the new vulnerabilities it introduces.",
    author: "AI Security Researcher",
    publishDate: "Dec 25, 2024",
    readTime: 16,
    category: "AI Security",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=240&fit=crop",
    tags: ["AI", "Machine Learning", "Threat Detection", "Innovation"]
  },
  {
    id: 9,
    title: "Cloud Security Best Practices for Remote Teams",
    excerpt: "Essential security measures every organization should implement when transitioning to cloud-based infrastructure and remote work environments.",
    author: "Cloud Security Expert",
    publishDate: "Dec 22, 2024",
    readTime: 13,
    category: "Cloud Security",
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=240&fit=crop",
    tags: ["Cloud Security", "Remote Work", "Best Practices", "Infrastructure"]
  },
  {
    id: 10,
    title: "Penetration Testing Career Path: Skills, Tools, and Certifications",
    excerpt: "A comprehensive roadmap for aspiring penetration testers, covering essential skills, popular tools, and the certifications that matter most to employers.",
    author: "Ethical Hacker",
    publishDate: "Dec 20, 2024",
    readTime: 20,
    category: "Career Development",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=240&fit=crop",
    tags: ["Penetration Testing", "Ethical Hacking", "Career Path", "Skills"]
  },
  {
    id: 11,
    title: "Ransomware Defense Strategies for Small Businesses",
    excerpt: "Practical and cost-effective security measures that small businesses can implement to protect against ransomware attacks and minimize potential damage.",
    author: "SMB Security Consultant",
    publishDate: "Dec 18, 2024",
    readTime: 9,
    category: "Threat Prevention",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=240&fit=crop",
    tags: ["Ransomware", "Small Business", "Prevention", "Defense"]
  },
  {
    id: 12,
    title: "The Psychology of Social Engineering: Understanding Human Vulnerabilities",
    excerpt: "Dive deep into the psychological tactics used by cybercriminals and learn how to build a human firewall through awareness and training.",
    author: "Security Awareness Trainer",
    publishDate: "Dec 15, 2024",
    readTime: 14,
    category: "Social Engineering",
    imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=240&fit=crop",
    tags: ["Social Engineering", "Psychology", "Human Factor", "Awareness"]
  },
  ]

   const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [error, setError] = useState(null);

  // Fetch blogs from API
  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await getBlogsApi();
      
      if (response.success) {
        console.log(response.data,"data list")
        setBlogs(response.data);
      } else {
        setError(response.message);
        toast.error(response.message);
      }
    } catch (err) {
      const errorMessage = 'Failed to load blogs. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Blog fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch blogs on component mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  // Handle blog selection
  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
    // You can add navigation logic here, e.g.:
    // navigate(`/blog/${blog._id}`);
    console.log('Selected blog:', blog);
  };

  // Retry function
  const handleRetry = () => {
    fetchBlogs();
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spin size="large" />
        <span className="ml-3 text-gray-600">Loading blogs...</span>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-20">
        <Empty
          description={
            <div>
              <p className="text-gray-600 mb-4">{error}</p>
              <Button 
                type="primary" 
                icon={<ReloadOutlined />}
                onClick={handleRetry}
              >
                Try Again
              </Button>
            </div>
          }
        />
      </div>
    );
  }

  // Empty state
  if (!blogs || blogs.length === 0) {
    return (
      <div className="text-center py-20">
        <Empty 
          description="No blogs found. Create your first blog post!"
        />
      </div>
    );
  }
  

  return (
    <div className="pt-16">
      <NavBar/>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-400/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Cyber Security <span className="text-teal-400">Blog</span>
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-gray-300">
              Stay updated with the latest trends, insights, and career advice in cybersecurity
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter/Search Bar */}
          <div className="mb-12">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Latest Articles</h2>
              <div className="flex gap-2">
                {['All', 'Beginner Guide', 'Certifications', 'Interview Tips', 'Data Privacy'].map((category) => (
                  <button
                    key={category}
                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-teal-50 hover:border-teal-300 transition-colors"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Blog Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs?.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition-colors font-semibold">
              Load More Articles
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Stay Updated with Cybersecurity Insights
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Subscribe to our newsletter for the latest cybersecurity trends, career tips, and industry news.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors font-semibold">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};