import React, { useState } from 'react';
import { useGetPostsQuery, useUpdatePostMutation, useDeletePostMutation } from '../features/post/postApiSlice';
import { useSelector } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Articles = () => {
    const { data: articles = [], isLoading, isError } = useGetPostsQuery();
    const [updatePost] = useUpdatePostMutation();
    const [deletePost] = useDeletePostMutation();

    const { isLoggedIn, user } = useSelector((state) => state.auth);
    const isAdmin = isLoggedIn && user?.role === 'admin';

    const [selectedArticle, setSelectedArticle] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const categories = [
        { id: 'all', name: 'All Articles', icon: '📚' },
        { id: 'technology', name: 'Technology', icon: '💻' },
        { id: 'lifestyle', name: 'Lifestyle', icon: '🌱' },
        { id: 'health', name: 'Health', icon: '🏥' },
        { id: 'business', name: 'Business', icon: '💼' },
        { id: 'travel', name: 'Travel', icon: '✈️' }
    ];

    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredArticles = articles.filter(article => {
        const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
        const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleImageChange = (event, setFieldValue) => {
        const file = event.target.files[0];
        if (file) {
            setFieldValue('image', file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpdate = async (values) => {
        try {
            await updatePost({ id: selectedArticle.id, ...values }).unwrap();
            setIsEditModalOpen(false);
            setImagePreview(null);
        } catch (err) {
            console.error('Failed to update post:', err);
        }
    };

    const handleDelete = async () => {
        try {
            await deletePost(selectedArticle.id).unwrap();
            setIsDeleteModalOpen(false);
        } catch (err) {
            console.error('Failed to delete post:', err);
        }
    };

    const validationSchema = Yup.object({
        title: Yup.string()
            .min(5, 'Title must be at least 5 characters')
            .max(100, 'Title must be less than 100 characters')
            .required('Title is required'),
        content: Yup.string()
            .min(50, 'Content must be at least 50 characters')
            .required('Content is required'),
        category: Yup.string()
            .required('Category is required'),
        tags: Yup.string()
            .min(2, 'At least one tag is required')
            .required('Tags are required')
    });

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden animate-pulse">
                                <div className="w-full h-48 bg-gray-300 dark:bg-gray-700"></div>
                                <div className="p-6">
                                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
                                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 text-5xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Failed to Load Articles
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Please try again later
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Our Articles
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Discover insights, tutorials, and stories from our community of writers
                    </p>
                </div>

                {/* Search and Filter */}
                <div className="mb-8 space-y-4">
                    {/* Search Bar */}
                    <div className="relative max-w-md mx-auto mb-10">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white dark:bg-gray-800 dark:border-gray-600 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                                    selectedCategory === category.id
                                        ? 'bg-blue-600 text-white shadow-lg'
                                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                                }`}
                            >
                                <span className="mr-2">{category.icon}</span>
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredArticles.map((article, index) => (
                        <article
                            key={article.id}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
                            style={{
                                animationDelay: `${index * 100}ms`
                            }}
                        >
                            {/* Image */}
                            <div className="relative overflow-hidden">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full capitalize">
                    {article.category}
                  </span>
                                </div>
                                <div className="absolute top-4 right-4 flex space-x-2">
                  <span className="flex items-center bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                      {article.views}
                  </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(article.publishDate)}
                  </span>
                                    <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                    {article.readTime}
                  </span>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                                    {article.title}
                                </h3>

                                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                                    {article.content}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {article.tags.slice(0, 3).map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-md"
                                        >
                      #{tag}
                    </span>
                                    ))}
                                </div>

                                {/* Author and Actions */}
                                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {article.author.charAt(0)}
                      </span>
                                        </div>
                                        <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                      {article.author}
                    </span>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <button className="flex items-center text-gray-500 hover:text-red-500 transition-colors duration-200">
                                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-xs">{article.likes}</span>
                                        </button>

                                        <button
                                            onClick={() => {
                                                setSelectedArticle(article);
                                                setIsEditModalOpen(true);
                                                setImagePreview(article.image);
                                            }}
                                            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105"
                                        >
                                            Read More
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* No Results */}
                {filteredArticles.length === 0 && (
                    <div className="text-center py-12">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No articles found</h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Try adjusting your search or filter criteria.
                        </p>
                    </div>
                )}

                {/* Load More Button */}
                {filteredArticles.length > 0 && (
                    <div className="text-center mt-12">
                        <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                            Load More Articles
                        </button>
                    </div>
                )}
            </div>

            {/* Edit Modal */}
            {isEditModalOpen && selectedArticle && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ease-in-out">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto transform transition-transform duration-300 scale-95 animate-fadeIn">
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Article</h2>
                                <button
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <Formik
                                initialValues={{
                                    title: selectedArticle.title,
                                    content: selectedArticle.content,
                                    category: selectedArticle.category,
                                    tags: selectedArticle.tags.join(', '),
                                    image: null,
                                }}
                                validationSchema={validationSchema}
                                onSubmit={handleUpdate}
                            >
                                {({ errors, touched, setFieldValue, values }) => (
                                    <Form className="space-y-6">
                                        <div className="grid grid-cols-1 gap-6">
                                            <div className="group">
                                                <label
                                                    htmlFor="title"
                                                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 transition-colors group-focus-within:text-blue-600"
                                                >
                                                    Article Title
                                                </label>
                                                <Field
                                                    type="text"
                                                    name="title"
                                                    id="title"
                                                    placeholder="Enter article title..."
                                                    className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-300 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                                                        errors.title && touched.title
                                                            ? 'border-red-500 bg-red-50'
                                                            : 'border-gray-300 hover:border-gray-400'
                                                    }`}
                                                />
                                                <ErrorMessage
                                                    name="title"
                                                    component="div"
                                                    className="text-red-500 text-sm mt-1 animate-pulse"
                                                />
                                            </div>

                                            <div className="group">
                                                <label
                                                    htmlFor="content"
                                                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 transition-colors group-focus-within:text-blue-600"
                                                >
                                                    Article Content
                                                </label>
                                                <Field
                                                    as="textarea"
                                                    name="content"
                                                    id="content"
                                                    rows="6"
                                                    placeholder="Write your article content here..."
                                                    className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-300 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 resize-none dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                                                        errors.content && touched.content
                                                            ? 'border-red-500 bg-red-50'
                                                            : 'border-gray-300 hover:border-gray-400'
                                                    }`}
                                                />
                                                <ErrorMessage
                                                    name="content"
                                                    component="div"
                                                    className="text-red-500 text-sm mt-1 animate-pulse"
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="group">
                                                    <label
                                                        htmlFor="category"
                                                        className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 transition-colors group-focus-within:text-blue-600"
                                                    >
                                                        Category
                                                    </label>
                                                    <Field
                                                        as="select"
                                                        name="category"
                                                        id="category"
                                                        className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-300 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                                                            errors.category && touched.category
                                                                ? 'border-red-500 bg-red-50'
                                                                : 'border-gray-300 hover:border-gray-400'
                                                        }`}
                                                    >
                                                        <option value="">Select a category</option>
                                                        {categories.filter(c => c.id !== 'all').map(category => (
                                                            <option key={category.id} value={category.id}>
                                                                {category.name}
                                                            </option>
                                                        ))}
                                                    </Field>
                                                    <ErrorMessage
                                                        name="category"
                                                        component="div"
                                                        className="text-red-500 text-sm mt-1 animate-pulse"
                                                    />
                                                </div>

                                                <div className="group">
                                                    <label
                                                        htmlFor="tags"
                                                        className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 transition-colors group-focus-within:text-blue-600"
                                                    >
                                                        Tags
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        name="tags"
                                                        id="tags"
                                                        placeholder="Enter tags separated by commas"
                                                        className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-300 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                                                            errors.tags && touched.tags
                                                                ? 'border-red-500 bg-red-50'
                                                                : 'border-gray-300 hover:border-gray-400'
                                                        }`}
                                                    />
                                                    <ErrorMessage
                                                        name="tags"
                                                        component="div"
                                                        className="text-red-500 text-sm mt-1 animate-pulse"
                                                    />
                                                </div>
                                            </div>

                                            <div className="group">
                                                <label
                                                    htmlFor="image"
                                                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                                                >
                                                    Featured Image
                                                </label>
                                                <div className="flex items-center space-x-6">
                                                    <div className="flex-1">
                                                        <input
                                                            type="file"
                                                            id="image"
                                                            accept="image/*"
                                                            onChange={(event) => handleImageChange(event, setFieldValue)}
                                                            className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg transition-all duration-300 hover:border-blue-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700"
                                                        />
                                                        <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                                                    </div>

                                                    {imagePreview && (
                                                        <div className="w-32 h-32 rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105">
                                                            <img
                                                                src={imagePreview}
                                                                alt="Preview"
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-end space-x-4 pt-6">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setIsEditModalOpen(false);
                                                    setIsDeleteModalOpen(true);
                                                }}
                                                className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 hover:bg-red-700"
                                            >
                                                Delete Article
                                            </button>
                                            <button
                                                type="submit"
                                                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-purple-700 transform hover:-translate-y-1"
                                            >
                                                Update Article
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && selectedArticle && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ease-in-out">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md transform transition-transform duration-300 scale-95 animate-fadeIn">
                        <div className="p-8">
                            <div className="text-center">
                                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
                                    <svg className="h-10 w-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                                <h3 className="mt-5 text-lg font-medium text-gray-900 dark:text-white">Delete Article</h3>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Are you sure you want to delete <span className="font-semibold">{selectedArticle.title}</span>? This action cannot be undone.
                                    </p>
                                </div>
                                <div className="mt-8 flex justify-center space-x-4">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsDeleteModalOpen(false);
                                            setIsEditModalOpen(true);
                                        }}
                                        className="px-6 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleDelete}
                                        className="px-6 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Articles;