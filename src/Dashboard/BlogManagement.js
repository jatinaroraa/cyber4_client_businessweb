// import React, { useState, useRef, useEffect, useCallback } from 'react';
// import {
//   Card,
//   Form,
//   Input,
//   Button,
//   Upload,
//   message,
//   Tag,
//   Space,
//   Table,
//   Popconfirm,
//   Modal,
//   Typography,
//   Divider,
//   Row,
//   Col,
//   Image,
//   Tooltip,
//   Select,
//   Avatar,
//   Spin
// } from 'antd';
// import {
//   PlusOutlined,
//   UploadOutlined,
//   EditOutlined,
//   DeleteOutlined,
//   EyeOutlined,
//   SaveOutlined,
//   PictureOutlined,
//   TagsOutlined,
//   FileTextOutlined,
//   CalendarOutlined,
//   UserOutlined,
//   LoadingOutlined
// } from '@ant-design/icons';

// // Import API functions
// import {
//   createBlogApi,
//   updateBlogApi,
//   getBlogsApi,
//   getBlogByIdApi,
//   deleteBlogApi
// } from '../services/blog';

// const { TextArea } = Input;
// const { Title, Text, Paragraph } = Typography;

// // Rich text editor component
// // const RichTextEditor = ({ value, onChange, placeholder }) => {
// //   const editorRef = useRef(null);
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [editorContent, setEditorContent] = useState(value || '');

// //   // Update internal state when value prop changes
// //   useEffect(() => {
// //     if (value !== editorContent) {
// //       setEditorContent(value || '');
// //     }
// //   }, [value]);

// //   // Handle input changes
// //   const handleInput = (e) => {
// //     const newContent = e.target.innerHTML;
// //     setEditorContent(newContent);
// //     if (onChange) {
// //       onChange(newContent);
// //     }
// //   };

// //   // Handle focus
// //   const handleFocus = (e) => {
// //     setIsEditing(true);
// //     // Place cursor at the end of content
// //     const range = document.createRange();
// //     const selection = window.getSelection();
// //     range.selectNodeContents(e.target);
// //     range.collapse(false);
// //     selection.removeAllRanges();
// //     selection.addRange(range);
// //   };

// //   // Handle blur
// //   const handleBlur = () => {
// //     setIsEditing(false);
// //   };

// //   // Format text commands
// //   const executeCommand = (command, value = null) => {
// //     document.execCommand(command, false, value);
// //     editorRef.current?.focus();
// //   };
  
// //   return (
// //     <div className="border border-gray-300 rounded-lg relative">
// //       <div className="flex items-center justify-between p-2 border-b bg-gray-50">
// //         <div className="flex space-x-2">
// //           <Button 
// //             size="small" 
// //             onClick={() => executeCommand('bold')}
// //             onMouseDown={(e) => e.preventDefault()}
// //           >
// //             <strong>B</strong>
// //           </Button>
// //           <Button 
// //             size="small" 
// //             onClick={() => executeCommand('italic')}
// //             onMouseDown={(e) => e.preventDefault()}
// //           >
// //             <em>I</em>
// //           </Button>
// //           <Button 
// //             size="small" 
// //             onClick={() => executeCommand('underline')}
// //             onMouseDown={(e) => e.preventDefault()}
// //           >
// //             <u>U</u>
// //           </Button>
// //           <Divider type="vertical" />
// //           <Button 
// //             size="small" 
// //             onClick={() => executeCommand('insertUnorderedList')}
// //             onMouseDown={(e) => e.preventDefault()}
// //           >
// //             • List
// //           </Button>
// //           <Button 
// //             size="small" 
// //             onClick={() => executeCommand('insertOrderedList')}
// //             onMouseDown={(e) => e.preventDefault()}
// //           >
// //             1. List
// //           </Button>
// //           <Button 
// //             size="small" 
// //             onClick={() => executeCommand('formatBlock', 'h3')}
// //             onMouseDown={(e) => e.preventDefault()}
// //           >
// //             H3
// //           </Button>
// //         </div>
// //         <Text type="secondary" style={{ fontSize: '12px' }}>
// //           Rich Text Editor
// //         </Text>
// //       </div>
// //       <div
// //         ref={editorRef}
// //         contentEditable
// //         className="p-4 focus:outline-none"
// //         style={{ minHeight: '200px' }}
// //         onInput={handleInput}
// //         onFocus={handleFocus}
// //         onBlur={handleBlur}
// //         suppressContentEditableWarning={true}
// //         dangerouslySetInnerHTML={{ __html: editorContent }}
// //       />
// //       {!editorContent && !isEditing && (
// //         <div 
// //           className="absolute pointer-events-none text-gray-400"
// //           style={{ top: '50px', left: '16px' }}
// //         >
// //           {placeholder}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };
// const RichTextEditor = ({ value, onChange, placeholder }) => {
//   const editorRef = useRef(null);
//   const [isEditing, setIsEditing] = useState(false);

//   // Handle input changes without re-rendering
//   const handleInput = useCallback((e) => {
//     const newContent = e.target.innerHTML;
//     if (onChange) {
//       onChange(newContent);
//     }
//   }, [onChange]);

//   // Handle focus
//   const handleFocus = useCallback(() => {
//     setIsEditing(true);
//   }, []);

//   // Handle blur
//   const handleBlur = useCallback(() => {
//     setIsEditing(false);
//   }, []);

//   // Format text commands
//   const executeCommand = useCallback((command, value = null) => {
//     document.execCommand(command, false, value);
//     if (editorRef.current) {
//       editorRef.current.focus();
//       // Trigger onChange after command
//       if (onChange) {
//         onChange(editorRef.current.innerHTML);
//       }
//     }
//   }, [onChange]);

//   // Prevent re-rendering by not using dangerouslySetInnerHTML on every render
//   useEffect(() => {
//     if (editorRef.current && editorRef.current.innerHTML !== value && !isEditing) {
//       const selection = window.getSelection();
//       const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
//       const startOffset = range ? range.startOffset : 0;
//       const endOffset = range ? range.endOffset : 0;
//       const startContainer = range ? range.startContainer : null;
      
//       editorRef.current.innerHTML = value || '';
      
//       // Restore cursor position if possible
//       try {
//         if (startContainer && editorRef.current.contains(startContainer)) {
//           const newRange = document.createRange();
//           newRange.setStart(startContainer, Math.min(startOffset, startContainer.textContent?.length || 0));
//           newRange.setEnd(startContainer, Math.min(endOffset, startContainer.textContent?.length || 0));
//           selection.removeAllRanges();
//           selection.addRange(newRange);
//         }
//       } catch (e) {
//         // Fallback: place cursor at end
//         const newRange = document.createRange();
//         newRange.selectNodeContents(editorRef.current);
//         newRange.collapse(false);
//         selection.removeAllRanges();
//         selection.addRange(newRange);
//       }
//     }
//   }, [value, isEditing]);
  
//   return (
//     <div className="border border-gray-300 rounded-lg relative">
//       <div className="flex items-center justify-between p-2 border-b bg-gray-50">
//         <div className="flex space-x-2">
//           <Button 
//             size="small" 
//             onClick={() => executeCommand('bold')}
//             onMouseDown={(e) => e.preventDefault()}
//           >
//             <strong>B</strong>
//           </Button>
//           <Button 
//             size="small" 
//             onClick={() => executeCommand('italic')}
//             onMouseDown={(e) => e.preventDefault()}
//           >
//             <em>I</em>
//           </Button>
//           <Button 
//             size="small" 
//             onClick={() => executeCommand('underline')}
//             onMouseDown={(e) => e.preventDefault()}
//           >
//             <u>U</u>
//           </Button>
//           <Divider type="vertical" />
//           <Button 
//             size="small" 
//             onClick={() => executeCommand('insertUnorderedList')}
//             onMouseDown={(e) => e.preventDefault()}
//           >
//             • List
//           </Button>
//           <Button 
//             size="small" 
//             onClick={() => executeCommand('insertOrderedList')}
//             onMouseDown={(e) => e.preventDefault()}
//           >
//             1. List
//           </Button>
//           <Button 
//             size="small" 
//             onClick={() => executeCommand('formatBlock', 'h3')}
//             onMouseDown={(e) => e.preventDefault()}
//           >
//             H3
//           </Button>
//         </div>
//         <Text type="secondary" style={{ fontSize: '12px' }}>
//           Rich Text Editor
//         </Text>
//       </div>
//       <div
//         ref={editorRef}
//         contentEditable
//         className="p-4 focus:outline-none"
//         style={{ minHeight: '200px' }}
//         onInput={handleInput}
//         onFocus={handleFocus}
//         onBlur={handleBlur}
//         suppressContentEditableWarning={true}
//         // Remove dangerouslySetInnerHTML from here
//       />
//       {(!value || value === '') && !isEditing && (
//         <div 
//           className="absolute pointer-events-none text-gray-400"
//           style={{ top: '50px', left: '16px' }}
//         >
//           {placeholder}
//         </div>
//       )}
//     </div>
//   );
// };



// const BlogManagement = () => {
//   const [activeTab, setActiveTab] = useState('list');
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [submitLoading, setSubmitLoading] = useState(false);
  
//   const [form] = Form.useForm();
//   const [editingBlog, setEditingBlog] = useState(null);
//   const [previewVisible, setPreviewVisible] = useState(false);
//   const [previewBlog, setPreviewBlog] = useState(null);
//   const [inputValue, setInputValue] = useState('');
//   const [tags, setTags] = useState([]);
//   const [thumbnailFile, setThumbnailFile] = useState(null);
//   const [thumbnailUrl, setThumbnailUrl] = useState(null);

//   // Fetch blogs on component mount
//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   // Fetch all blogs
//   const fetchBlogs = async () => {
//     setLoading(true);
//     try {
//       const response = await getBlogsApi();
//       if (response.success) {
//         setBlogs(response.data);
//       } else {
//         message.error(response.message);
//       }
//     } catch (error) {
//       message.error('Failed to fetch blogs');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle form submission
//   const onFinish = async (values) => {
//     setSubmitLoading(true);
    
//     try {
//       const blogData = {
//         title: values.title,
//         description: values.description,
//         content: values.content,
//         status: values.status || 'published',
//         tags: tags
//       };

//       let response;
      
//       if (editingBlog) {
//         // Update existing blog
//         response = await updateBlogApi(editingBlog._id, blogData, thumbnailFile);
//       } else {
//         // Create new blog
//         response = await createBlogApi(blogData, thumbnailFile);
//       }

//       if (response.success) {
//         message.success(response.message);
        
//         // Reset form and state
//         form.resetFields();
//         setTags([]);
//         setThumbnailFile(null);
//         setThumbnailUrl(null);
//         setEditingBlog(null);
        
//         // Refresh blogs list
//         await fetchBlogs();
        
//         // Switch to list tab
//         setActiveTab('list');
//       } else {
//         message.error(response.message);
//       }
//     } catch (error) {
//       message.error('An error occurred while saving the blog');
//       console.error('Blog save error:', error);
//     } finally {
//       setSubmitLoading(false);
//     }
//   };

//   // Handle tag operations
//   const handleTagClose = (removedTag) => {
//     setTags(tags.filter(tag => tag !== removedTag));
//   };

//   const handleTagAdd = () => {
//     if (inputValue && !tags.includes(inputValue)) {
//       setTags([...tags, inputValue]);
//       setInputValue('');
//     }
//   };

//   // Handle blog operations
//   const handleEdit = async (blog) => {
//     setEditingBlog(blog);
//     setTags(blog.tags || []);
//     setThumbnailUrl(blog.thumbnail);
//     setThumbnailFile(null); // Reset file for edit mode
    
//     form.setFieldsValue({
//       title: blog.title,
//       description: blog.description,
//       content: blog.content,
//       status: blog.status
//     });
    
//     setActiveTab('create');
//   };

//   const handleDelete = async (id) => {
//     try {
//       const response = await deleteBlogApi(id);
//       if (response.success) {
//         message.success(response.message);
//         await fetchBlogs(); // Refresh list
//       } else {
//         message.error(response.message);
//       }
//     } catch (error) {
//       message.error('Failed to delete blog');
//     }
//   };

//   const handlePreview = (blog) => {
//     setPreviewBlog(blog);
//     setPreviewVisible(true);
//   };

//   const handleCancel = () => {
//     form.resetFields();
//     setTags([]);
//     setThumbnailFile(null);
//     setThumbnailUrl(null);
//     setEditingBlog(null);
//   };

//   // Upload props for thumbnail
//   const uploadProps = {
//     name: 'file',
//     accept: 'image/*',
//     listType: 'picture-card',
//     className: 'upload-list-inline',
//     showUploadList: false,
//     beforeUpload: (file) => {
//       // Validate file type
//       const isImage = file.type.startsWith('image/');
//       if (!isImage) {
//         message.error('You can only upload image files!');
//         return false;
//       }

//       // Validate file size (2MB)
//       const isLt2M = file.size / 1024 / 1024 < 2;
//       if (!isLt2M) {
//         message.error('Image must be smaller than 2MB!');
//         return false;
//       }

//       // Store the actual File object for API submission
//       setThumbnailFile(file);
      
//       // Create preview URL for display
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setThumbnailUrl(e.target.result);
//       };
//       reader.readAsDataURL(file);
      
//       return false; // Prevent automatic upload
//     },
//     onRemove: () => {
//       setThumbnailFile(null);
//       setThumbnailUrl(null);
//     },
//   };

//   // Table columns for blog list
//   const columns = [
//     {
//       title: 'Thumbnail',
//       dataIndex: 'thumbnail',
//       key: 'thumbnail',
//       width: 80,
//       render: (thumbnail) => (
//         <Avatar
//           size={50}
//           icon={<PictureOutlined />}
//           src={thumbnail}
//           shape="square"
//         />
//       ),
//     },
//     {
//       title: 'Title',
//       dataIndex: 'title',
//       key: 'title',
//       ellipsis: true,
//       render: (text) => (
//         <Text strong style={{ color: '#1890ff' }}>
//           {text}
//         </Text>
//       ),
//     },
//     {
//       title: 'Description',
//       dataIndex: 'description',
//       key: 'description',
//       ellipsis: true,
//       width: 300,
//     },
//     {
//       title: 'Tags',
//       dataIndex: 'tags',
//       key: 'tags',
//       render: (tags) => (
//         <Space wrap>
//           {tags?.slice(0, 2).map((tag) => (
//             <Tag key={tag} color="blue">
//               {tag}
//             </Tag>
//           ))}
//           {tags?.length > 2 && (
//             <Tag color="default">+{tags.length - 2} more</Tag>
//           )}
//         </Space>
//       ),
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//       render: (status) => (
//         <Tag color={status === 'published' ? 'green' : 'orange'}>
//           {status?.toUpperCase()}
//         </Tag>
//       ),
//     },
//     {
//       title: 'Created',
//       dataIndex: 'createdAt',
//       key: 'createdAt',
//       render: (date) => (
//         <Space>
//           <CalendarOutlined />
//           {date ? new Date(date).toLocaleDateString() : '-'}
//         </Space>
//       ),
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       fixed: 'right',
//       width: 150,
//       render: (_, record) => (
//         <Space>
//           <Tooltip title="Preview">
//             <Button
//               type="text"
//               icon={<EyeOutlined />}
//               onClick={() => handlePreview(record)}
//             />
//           </Tooltip>
//           <Tooltip title="Edit">
//             <Button
//               type="text"
//               icon={<EditOutlined />}
//               onClick={() => handleEdit(record)}
//             />
//           </Tooltip>
//           <Tooltip title="Delete">
//             <Popconfirm
//               title="Are you sure you want to delete this blog?"
//               onConfirm={() => handleDelete(record._id)}
//               okText="Yes"
//               cancelText="No"
//             >
//               <Button type="text" danger icon={<DeleteOutlined />} />
//             </Popconfirm>
//           </Tooltip>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       {/* Header */}
//       <div className="mb-6">
//         <Title level={2} className="mb-2">
//           <FileTextOutlined className="mr-3" />
//           Blog Management
//         </Title>
//         <Text type="secondary">
//           Create, edit, and manage your blog posts with rich content and media
//         </Text>
//       </div>

//       {/* Tab Navigation */}
//       <div className="mb-6">
//         <Space size="large">
//           <Button
//             type={activeTab === 'create' ? 'primary' : 'default'}
//             icon={<PlusOutlined />}
//             onClick={() => {
//               setActiveTab('create');
//               if (!editingBlog) {
//                 form.resetFields();
//                 setTags([]);
//                 setThumbnailUrl(null);
//                 setThumbnailFile(null);
//               }
//             }}
//           >
//             {editingBlog ? 'Edit Blog' : 'Create Blog'}
//           </Button>
//           <Button
//             type={activeTab === 'list' ? 'primary' : 'default'}
//             icon={<EyeOutlined />}
//             onClick={() => setActiveTab('list')}
//           >
//             Blog List ({blogs.length})
//           </Button>
//         </Space>
//       </div>

//       {/* Create/Edit Blog Form */}
//       {activeTab === 'create' && (
//         <Card className="mb-6">
//           <Title level={3} className="mb-4">
//             {editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
//           </Title>
          
//           <Form
//             form={form}
//             layout="vertical"
//             onFinish={onFinish}
//             initialValues={{
//               status: 'published'
//             }}
//           >
//             <Row gutter={24}>
//               <Col xs={24} md={16}>
//                 {/* Title */}
//                 <Form.Item
//                   name="title"
//                   label="Blog Title"
//                   rules={[{ required: true, message: 'Please enter blog title' }]}
//                 >
//                   <Input
//                     placeholder="Enter an engaging blog title..."
//                     size="large"
//                   />
//                 </Form.Item>

//                 {/* Description */}
//                 <Form.Item
//                   name="description"
//                   label="Description"
//                   rules={[{ required: true, message: 'Please enter blog description' }]}
//                 >
//                   <TextArea
//                     rows={3}
//                     placeholder="Write a brief description of your blog post..."
//                     maxLength={200}
//                     showCount
//                   />
//                 </Form.Item>

//                 {/* Rich Text Content */}
//                 <Form.Item
//                   name="content"
//                   label="Blog Content"
//                   rules={[{ required: true, message: 'Please enter blog content' }]}
//                 >
//                   <RichTextEditor
//                     value={form.getFieldValue('content')}
//                     onChange={(value) => {
//                       form.setFieldsValue({ content: value });
//                       // Trigger validation
//                       form.validateFields(['content']).catch(() => {});
//                     }}
//                     placeholder="Start writing your blog content here. Use the toolbar above to format your text..."
//                   />
//                 </Form.Item>
//               </Col>

//               <Col xs={24} md={8}>
//                 {/* Thumbnail Upload */}
//                 <Form.Item label="Thumbnail Image">
//                   <div className="thumbnail-upload-container">
//                     {thumbnailUrl ? (
//                       <div className="thumbnail-preview-wrapper">
//                         <div className="thumbnail-image-container">
//                           <img
//                             src={thumbnailUrl}
//                             alt="Blog thumbnail"
//                             className="thumbnail-image"
//                           />
//                           <div className="thumbnail-overlay">
//                             <Upload {...uploadProps}>
//                               <Button 
//                                 type="primary" 
//                                 ghost 
//                                 icon={<EditOutlined />}
//                                 size="small"
//                               >
//                                 Change
//                               </Button>
//                             </Upload>
//                             <Button 
//                               type="primary" 
//                               danger 
//                               ghost 
//                               icon={<DeleteOutlined />}
//                               size="small"
//                               onClick={() => {
//                                 setThumbnailUrl(null);
//                                 setThumbnailFile(null);
//                               }}
//                               style={{ marginTop: '8px' }}
//                             >
//                               Remove
//                             </Button>
//                           </div>
//                         </div>
//                       </div>
//                     ) : (
//                       <Upload {...uploadProps}>
//                         <div className="upload-area">
//                           <div className="upload-content">
//                             <PictureOutlined className="upload-icon" />
//                             <div className="upload-text">
//                               <div className="upload-main-text">Upload Thumbnail</div>
//                               <div className="upload-sub-text">
//                                 Drag & drop or click to browse
//                               </div>
//                               <div className="upload-format-text">
//                                 PNG, JPG, GIF up to 2MB
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </Upload>
//                     )}
//                   </div>
                  
//                   <style jsx>{`
//                     .thumbnail-upload-container {
//                       width: 100%;
//                     }
                    
//                     .thumbnail-preview-wrapper {
//                       position: relative;
//                       display: inline-block;
//                       width: 100%;
//                       max-width: 300px;
//                     }
                    
//                     .thumbnail-image-container {
//                       position: relative;
//                       width: 100%;
//                       height: 200px;
//                       border-radius: 12px;
//                       overflow: hidden;
//                       border: 2px solid #e8e8e8;
//                       background: #fafafa;
//                     }
                    
//                     .thumbnail-image {
//                       width: 100%;
//                       height: 100%;
//                       object-fit: cover;
//                       display: block;
//                     }
                    
//                     .thumbnail-overlay {
//                       position: absolute;
//                       top: 0;
//                       left: 0;
//                       right: 0;
//                       bottom: 0;
//                       background: rgba(0, 0, 0, 0.6);
//                       display: flex;
//                       flex-direction: column;
//                       align-items: center;
//                       justify-content: center;
//                       opacity: 0;
//                       transition: opacity 0.3s ease;
//                     }
                    
//                     .thumbnail-image-container:hover .thumbnail-overlay {
//                       opacity: 1;
//                     }
                    
//                     .upload-area {
//                       width: 100%;
//                       max-width: 300px;
//                       height: 200px;
//                       border: 2px dashed #d9d9d9;
//                       border-radius: 12px;
//                       background: #fafafa;
//                       transition: all 0.3s ease;
//                       cursor: pointer;
//                       position: relative;
//                     }
                    
//                     .upload-area:hover {
//                       border-color: #1890ff;
//                       background: #f0f8ff;
//                     }
                    
//                     .upload-content {
//                       position: absolute;
//                       top: 50%;
//                       left: 50%;
//                       transform: translate(-50%, -50%);
//                       text-align: center;
//                       width: 100%;
//                       padding: 20px;
//                     }
                    
//                     .upload-icon {
//                       font-size: 48px;
//                       color: #d9d9d9;
//                       margin-bottom: 16px;
//                       display: block;
//                     }
                    
//                     .upload-text {
//                       color: #666;
//                     }
                    
//                     .upload-main-text {
//                       font-size: 16px;
//                       font-weight: 500;
//                       margin-bottom: 8px;
//                       color: #333;
//                     }
                    
//                     .upload-sub-text {
//                       font-size: 14px;
//                       margin-bottom: 4px;
//                       color: #666;
//                     }
                    
//                     .upload-format-text {
//                       font-size: 12px;
//                       color: #999;
//                     }
                    
//                     .upload-area:hover .upload-icon {
//                       color: #1890ff;
//                     }
                    
//                     .upload-area:hover .upload-main-text {
//                       color: #1890ff;
//                     }
//                   `}</style>
//                 </Form.Item>

//                 {/* Tags */}
//                 <Form.Item label="Tags">
//                   <div className="space-y-2">
//                     <div className="flex flex-wrap gap-2">
//                       {tags.map((tag) => (
//                         <Tag
//                           key={tag}
//                           closable
//                           onClose={() => handleTagClose(tag)}
//                           color="blue"
//                         >
//                           {tag}
//                         </Tag>
//                       ))}
//                     </div>
//                     <div className="flex gap-2">
//                       <Input
//                         value={inputValue}
//                         onChange={(e) => setInputValue(e.target.value)}
//                         placeholder="Add a tag..."
//                         onPressEnter={handleTagAdd}
//                         className="flex-1"
//                       />
//                       <Button
//                         type="dashed"
//                         onClick={handleTagAdd}
//                         icon={<TagsOutlined />}
//                       >
//                         Add
//                       </Button>
//                     </div>
//                   </div>
//                 </Form.Item>

//                 {/* Status */}
//                 <Form.Item name="status" label="Status">
//                   <Select>
//                     <Select.Option value="draft">Draft</Select.Option>
//                     <Select.Option value="published">Published</Select.Option>
//                   </Select>
//                 </Form.Item>
//               </Col>
//             </Row>

//             {/* Form Actions */}
//             <Divider />
//             <div className="flex justify-end space-x-4">
//               <Button onClick={handleCancel} disabled={submitLoading}>
//                 Cancel
//               </Button>
//               <Button
//                 type="primary"
//                 htmlType="submit"
//                 icon={submitLoading ? <LoadingOutlined /> : <SaveOutlined />}
//                 loading={submitLoading}
//                 size="large"
//               >
//                 {editingBlog ? 'Update Blog' : 'Create Blog'}
//               </Button>
//             </div>
//           </Form>
//         </Card>
//       )}

//       {/* Blog List */}
//       {activeTab === 'list' && (
//         <Card>
//           <div className="flex justify-between items-center mb-4">
//             <Title level={3}>All Blog Posts</Title>
//             <Button
//               type="primary"
//               icon={<PlusOutlined />}
//               onClick={() => {
//                 setActiveTab('create');
//                 setEditingBlog(null);
//                 form.resetFields();
//                 setTags([]);
//                 setThumbnailUrl(null);
//                 setThumbnailFile(null);
//               }}
//             >
//               Create New Blog
//             </Button>
//           </div>
          
//           <Spin spinning={loading}>
//             <Table
//               columns={columns}
//               dataSource={blogs}
//               rowKey="_id"
//               pagination={{
//                 pageSize: 10,
//                 showSizeChanger: true,
//                 showQuickJumper: true,
//                 showTotal: (total, range) =>
//                   `${range[0]}-${range[1]} of ${total} blogs`,
//               }}
//               scroll={{ x: 1000 }}
//             />
//           </Spin>
//         </Card>
//       )}

//       {/* Preview Modal */}
//       <Modal
//         title={previewBlog?.title}
//         open={previewVisible}
//         onCancel={() => setPreviewVisible(false)}
//         footer={[
//           <Button key="close" onClick={() => setPreviewVisible(false)}>
//             Close
//           </Button>,
//         ]}
//         width={800}
//       >
//         {previewBlog && (
//           <div className="space-y-4">
//             {previewBlog.thumbnail && (
//               <img
//                 src={previewBlog.thumbnail}
//                 alt="Blog thumbnail"
//                 className="w-full h-48 object-cover rounded-lg"
//               />
//             )}
            
//             <div>
//               <Text type="secondary">Description:</Text>
//               <Paragraph>{previewBlog.description}</Paragraph>
//             </div>

//             <div>
//               <Text type="secondary">Tags:</Text>
//               <div className="mt-2">
//                 {previewBlog.tags?.map((tag) => (
//                   <Tag key={tag} color="blue">
//                     {tag}
//                   </Tag>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <Text type="secondary">Content:</Text>
//               <div
//                 className="mt-2 prose max-w-none"
//                 dangerouslySetInnerHTML={{ __html: previewBlog.content }}
//               />
//             </div>

//             <div className="flex justify-between items-center text-sm text-gray-500 pt-4 border-t">
//               <span>
//                 <UserOutlined className="mr-1" />
//                 {previewBlog.author || 'Admin'}
//               </span>
//               <span>
//                 <CalendarOutlined className="mr-1" />
//                 {previewBlog.createdAt ? new Date(previewBlog.createdAt).toLocaleDateString() : '-'}
//               </span>
//             </div>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default BlogManagement;

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Upload,
  message,
  Tag,
  Space,
  Table,
  Popconfirm,
  Modal,
  Typography,
  Divider,
  Row,
  Col,
  Image,
  Tooltip,
  Select,
  Avatar,
  Spin
} from 'antd';
import {
  PlusOutlined,
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SaveOutlined,
  PictureOutlined,
  TagsOutlined,
  FileTextOutlined,
  CalendarOutlined,
  UserOutlined,
  LoadingOutlined,
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  FontSizeOutlined
} from '@ant-design/icons';

// Import API functions
import {
  createBlogApi,
  updateBlogApi,
  getBlogsApi,
  getBlogByIdApi,
  deleteBlogApi
} from '../services/blog';
import RichTextEditor from './RichTextEditor';

const { TextArea } = Input;
const { Title, Text, Paragraph } = Typography;

// Enhanced Rich Text Editor Component
// Enhanced Rich Text Editor Component with Fixed Selection Management
// Enhanced Rich Text Editor Component with Modern Selection Management


const BlogManagement = () => {
  const [activeTab, setActiveTab] = useState('list');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  
  const [form] = Form.useForm();
  const [editingBlog, setEditingBlog] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewBlog, setPreviewBlog] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [tags, setTags] = useState([]);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [editorContent, setEditorContent] = useState('');

  // Predefined blog categories/tags
  const predefinedTags = [
    'Cybersecurity Careers',
    'IT Certifications', 
    'Freshers Guide',
    'Entry-Level Cybersecurity',
    'Global Certifications',
    'Indian IT Market',
    'Skill Development',
    'Tech Jobs 2025',
    'Cybersecurity Training',
    'Career Growth in IT',
    'IT Audit',
    'IT GRC'
  ];

  // Fetch blogs on component mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  // Fetch all blogs
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await getBlogsApi();
      if (response.success) {
        setBlogs(response.data || []);
      } else {
        message.error(response.message || 'Failed to fetch blogs');
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      message.error('Failed to fetch blogs');
      setBlogs([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const onFinish = async (values) => {
    setSubmitLoading(true);
    
    try {
      const blogData = {
        title: values.title,
        description: values.description,
        content: editorContent || values.content,
        status: values.status || 'published',
        tags: tags,
        keywords: values.keywords,
        category: values.category
      };

      let response;
      
      if (editingBlog) {
        // Update existing blog
        response = await updateBlogApi(editingBlog._id, blogData, thumbnailFile);
      } else {
        // Create new blog
        response = await createBlogApi(blogData, thumbnailFile);
      }

      if (response.success) {
        message.success(response.message || 'Blog saved successfully');
        
        // Reset form and state
        form.resetFields();
        setTags([]);
        setThumbnailFile(null);
        setThumbnailUrl(null);
        setEditingBlog(null);
        setEditorContent('');
        
        // Refresh blogs list
        await fetchBlogs();
        
        // Switch to list tab
        setActiveTab('list');
      } else {
        message.error(response.message || 'Failed to save blog');
      }
    } catch (error) {
      message.error('An error occurred while saving the blog');
      console.error('Blog save error:', error);
    } finally {
      setSubmitLoading(false);
    }
  };

  // Handle tag operations
  const handleTagClose = (removedTag) => {
    setTags(tags.filter(tag => tag !== removedTag));
  };

  const handleTagAdd = () => {
    if (inputValue && inputValue.trim() && !tags.includes(inputValue.trim())) {
      setTags([...tags, inputValue.trim()]);
      setInputValue('');
    }
  };

  // Handle blog operations
  const handleEdit = async (blog) => {
    setEditingBlog(blog);
    setTags(blog.tags || []);
    setThumbnailUrl(blog.thumbnail);
    setThumbnailFile(null);
    setEditorContent(blog.content || '');
    
    form.setFieldsValue({
      title: blog.title,
      description: blog.description,
      content: blog.content,
      status: blog.status,
      keywords: blog.keywords,
      category: blog.category
    });
    
    setActiveTab('create');
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteBlogApi(id);
      if (response.success) {
        message.success(response.message || 'Blog deleted successfully');
        await fetchBlogs();
      } else {
        message.error(response.message || 'Failed to delete blog');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      message.error('Failed to delete blog');
    }
  };

  const handlePreview = (blog) => {
    setPreviewBlog(blog);
    setPreviewVisible(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setTags([]);
    setThumbnailFile(null);
    setThumbnailUrl(null);
    setEditingBlog(null);
    setEditorContent('');
    setInputValue('');
  };

  // Handle editor content change
  const handleEditorChange = (content) => {
    setEditorContent(content);
    form.setFieldsValue({ content });
  };

  // Upload props for thumbnail
  const uploadProps = {
    name: 'file',
    accept: 'image/*',
    listType: 'picture-card',
    className: 'upload-list-inline',
    showUploadList: false,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('You can only upload image files!');
        return false;
      }

      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must be smaller than 2MB!');
        return false;
      }

      setThumbnailFile(file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setThumbnailUrl(e.target.result);
      };
      reader.readAsDataURL(file);
      
      return false;
    },
    onRemove: () => {
      setThumbnailFile(null);
      setThumbnailUrl(null);
    },
  };

  // Table columns for blog list
  const columns = [
    {
      title: 'Thumbnail',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      width: 80,
      render: (thumbnail) => (
        <Avatar
          size={50}
          icon={<PictureOutlined />}
          src={thumbnail}
          shape="square"
        />
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
      render: (text) => (
        <Text strong style={{ color: '#1890ff' }}>
          {text}
        </Text>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category) => (
        <Tag color="purple">
          {category}
        </Tag>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
      width: 250,
    },
    {
      title: 'Keywords',
      dataIndex: 'keywords',
      key: 'keywords',
      ellipsis: true,
      width: 150,
      render: (keywords) => (
        <Text type="secondary" style={{ fontSize: '12px' }}>
          {keywords}
        </Text>
      ),
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags) => (
        <Space wrap>
          {tags?.slice(0, 2).map((tag) => (
            <Tag key={tag} color="blue" style={{ fontSize: '11px' }}>
              {tag}
            </Tag>
          ))}
          {tags?.length > 2 && (
            <Tag color="default" style={{ fontSize: '11px' }}>+{tags.length - 2} more</Tag>
          )}
        </Space>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'published' ? 'green' : 'orange'}>
          {status?.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => (
        <Space>
          <CalendarOutlined />
          {date ? new Date(date).toLocaleDateString() : '-'}
        </Space>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
      width: 150,
      render: (_, record) => (
        <Space>
          <Tooltip title="Preview">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => handlePreview(record)}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure you want to delete this blog?"
              onConfirm={() => handleDelete(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="text" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <Title level={2} className="mb-2">
          <FileTextOutlined className="mr-3" />
          Blog Management
        </Title>
        <Text type="secondary">
          Create, edit, and manage your blog posts with rich content and media
        </Text>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <Space size="large">
          <Button
            type={activeTab === 'create' ? 'primary' : 'default'}
            icon={<PlusOutlined />}
            onClick={() => {
              setActiveTab('create');
              if (!editingBlog) {
                handleCancel();
              }
            }}
          >
            {editingBlog ? 'Edit Blog' : 'Create Blog'}
          </Button>
          <Button
            type={activeTab === 'list' ? 'primary' : 'default'}
            icon={<EyeOutlined />}
            onClick={() => setActiveTab('list')}
          >
            Blog List ({blogs.length})
          </Button>
        </Space>
      </div>

      {/* Create/Edit Blog Form */}
      {activeTab === 'create' && (
        <Card className="mb-6">
          <Title level={3} className="mb-4">
            {editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
          </Title>
          
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              status: 'published'
            }}
          >
            <Row gutter={24}>
              <Col xs={24} md={16}>
                {/* Title */}
                <Form.Item
                  name="title"
                  label="Blog Title"
                  rules={[{ required: true, message: 'Please enter blog title' }]}
                >
                  <Input
                    placeholder="Enter an engaging blog title..."
                    size="large"
                  />
                </Form.Item>

                {/* Description */}
                <Form.Item
                  name="description"
                  label="Description"
                  rules={[{ required: true, message: 'Please enter blog description' }]}
                >
                  <TextArea
                    rows={3}
                    placeholder="Write a brief description of your blog post..."
                    maxLength={200}
                    showCount
                  />
                </Form.Item>

                {/* Keywords */}
                <Form.Item
                  name="keywords"
                  label="Keywords"
                  rules={[{ required: false, message: 'Please enter keywords for SEO' }]}
                >
                  <Input
                    placeholder="Enter keywords separated by commas (e.g., cybersecurity, IT certification, career)"
                    size="large"
                  />
                </Form.Item>

                {/* Rich Text Content */}
                <Form.Item
                  name="content"
                  label="Blog Content"
                  rules={[{ required: true, message: 'Please enter blog content' }]}
                >
                  <RichTextEditor
                    value={editorContent}
                    onChange={handleEditorChange}
                    placeholder="Start writing your blog content here. Use the toolbar above to format your text..."
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={8}>
                {/* Category */}
               

                {/* Thumbnail Upload */}
                <Form.Item label="Thumbnail Image">
                  <div style={{ width: '100%' }}>
                    {thumbnailUrl ? (
                      <div style={{ 
                        position: 'relative', 
                        width: '100%'
                      }}>
                        <div style={{
                          position: 'relative',
                          width: '100%',
                          height: '200px',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          border: '2px solid #e8e8e8',
                          background: '#fafafa'
                        }}>
                          <img
                            src={thumbnailUrl}
                            alt="Blog thumbnail"
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              display: 'block'
                            }}
                          />
                          <div style={{
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px'
                          }}>
                            <Upload {...uploadProps}>
                              <Button 
                                type="primary" 
                                size="small"
                                icon={<EditOutlined />}
                              >
                                Change
                              </Button>
                            </Upload>
                            <Button 
                              type="primary" 
                              danger 
                              size="small"
                              icon={<DeleteOutlined />}
                              onClick={() => {
                                setThumbnailUrl(null);
                                setThumbnailFile(null);
                              }}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Upload {...uploadProps}>
                        <div style={{
                          width: '100%',
                          height: '200px',
                          border: '2px dashed #d9d9d9',
                          borderRadius: '12px',
                          background: '#fafafa',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'column',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}>
                          <PictureOutlined style={{ fontSize: '48px', color: '#d9d9d9', marginBottom: '16px' }} />
                          <div style={{ textAlign: 'center', color: '#666' }}>
                            <div style={{ fontSize: '16px', fontWeight: '500', marginBottom: '8px' }}>
                              Upload Thumbnail
                            </div>
                            <div style={{ fontSize: '14px', marginBottom: '4px' }}>
                              Drag & drop or click to browse
                            </div>
                            <div style={{ fontSize: '12px', color: '#999' }}>
                              PNG, JPG, GIF up to 2MB
                            </div>
                          </div>
                        </div>
                      </Upload>
                    )}
                  </div>
                </Form.Item>
               
                
               
                {/* Tags */}
                <Form.Item label="Tags">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {tags.map((tag) => (
                        <Tag
                          key={tag}
                          closable
                          onClose={() => handleTagClose(tag)}
                          color="blue"
                        >
                          {tag}
                        </Tag>
                      ))}
                    </div>
                    
                    {/* Quick add predefined tags */}
                    <div style={{ marginBottom: '8px' }}>
                      {/* <Text type="secondary" style={{ fontSize: '12px', marginBottom: '4px', display: 'block' }}>
                        Quick add tags:
                      </Text> */}
                      {/* <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {predefinedTags
                          .filter(predefinedTag => !tags.includes(predefinedTag))
                          .slice(0, 6)
                          .map(predefinedTag => (
                            <Tag
                              key={predefinedTag}
                              style={{ cursor: 'pointer', fontSize: '11px' }}
                              onClick={() => {
                                if (!tags.includes(predefinedTag)) {
                                  setTags([...tags, predefinedTag]);
                                }
                              }}
                            >
                              + {predefinedTag}
                            </Tag>
                          ))
                        }
                      </div> */}
                    </div>
                    
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Add a custom tag..."
                        onPressEnter={handleTagAdd}
                        style={{ flex: 1 }}
                      />
                      <Button
                        type="dashed"
                        onClick={handleTagAdd}
                        icon={<TagsOutlined />}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </Form.Item>
                <Form.Item 
                
                  name="category" 
                  label="Blog Category"
                  rules={[{ required: true, message: 'Please select a blog category' }]}
                >
                  <Select placeholder="Select blog category" size="large">
                    {predefinedTags.map(category => (
                      <Select.Option key={category} value={category}>
                        {category}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                {/* Status */}
                <Form.Item name="status" label="Status">
                  <Select>
                    <Select.Option value="draft">Draft</Select.Option>
                    <Select.Option value="published">Published</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            {/* Form Actions */}
            <Divider />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <Button onClick={handleCancel} disabled={submitLoading}>
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                icon={submitLoading ? <LoadingOutlined /> : <SaveOutlined />}
                loading={submitLoading}
                size="large"
              >
                {editingBlog ? 'Update Blog' : 'Create Blog'}
              </Button>
            </div>
          </Form>
        </Card>
      )}

      {/* Blog List */}
      {activeTab === 'list' && (
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <Title level={3}>All Blog Posts</Title>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setActiveTab('create');
                setEditingBlog(null);
                handleCancel();
              }}
            >
              Create New Blog
            </Button>
          </div>
          
          <Spin spinning={loading}>
            <Table
              columns={columns}
              dataSource={blogs}
              rowKey="_id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total} blogs`,
              }}
              scroll={{ x: 1000 }}
            />
          </Spin>
        </Card>
      )}

      {/* Preview Modal */}
      <Modal
        title={previewBlog?.title}
        open={previewVisible}
        onCancel={() => setPreviewVisible(false)}
        footer={[
          <Button key="close" onClick={() => setPreviewVisible(false)}>
            Close
          </Button>,
        ]}
        width={800}
      >
        {previewBlog && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {previewBlog.thumbnail && (
              <img
                src={previewBlog.thumbnail}
                alt="Blog thumbnail"
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
              />
            )}
            
            <div>
              <Text type="secondary">Description:</Text>
              <Paragraph>{previewBlog.description}</Paragraph>
            </div>
            
            <div>
              <Text type="secondary">Category:</Text>
              <div style={{ marginTop: '8px' }}>
                <Tag color="purple">{previewBlog.category}</Tag>
              </div>
            </div>
            
            <div>
              <Text type="secondary">Keywords:</Text>
              <Paragraph style={{ fontSize: '12px', color: '#666' }}>
                {previewBlog.keywords}
              </Paragraph>
            </div>

            <div>
              <Text type="secondary">Tags:</Text>
              <div style={{ marginTop: '8px' }}>
                {previewBlog.tags?.map((tag) => (
                  <Tag key={tag} color="blue">
                    {tag}
                  </Tag>
                ))}
              </div>
            </div>

            <div>
              <Text type="secondary">Content:</Text>
              <div
                style={{
                  marginTop: '8px',
                  lineHeight: '1.6',
                  fontSize: '14px'
                }}
                dangerouslySetInnerHTML={{ __html: previewBlog.content }}
              />
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '12px',
              color: '#999',
              paddingTop: '16px',
              borderTop: '1px solid #f0f0f0'
            }}>
              <span>
                <UserOutlined style={{ marginRight: '4px' }} />
                {previewBlog.author || 'Admin'}
              </span>
              <span>
                <CalendarOutlined style={{ marginRight: '4px' }} />
                {previewBlog.createdAt ? new Date(previewBlog.createdAt).toLocaleDateString() : '-'}
              </span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BlogManagement;