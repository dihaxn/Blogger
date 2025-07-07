import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAddPostMutation } from '../features/post/PostApiSlice';
import { useSelector } from 'react-redux';

const AddArticle = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');
    const [addPost] = useAddPostMutation();
    const { user } = useSelector((state) => state.auth);

    const initialValues = {
        topic: '',
        heading: '',
        content: '',
        image: null,
        tags: ''
    };

    const validationSchema = Yup.object({
        topic: Yup.string()
            .min(3, 'Topic must be at least 3 characters')
            .required('Topic is required'),
        heading: Yup.string()
            .min(5, 'Heading must be at least 5 characters')
            .max(100, 'Heading must be less than 100 characters')
            .required('Heading is required'),
        content: Yup.string()
            .min(50, 'Content must be at least 50 characters')
            .required('Content is required'),
        tags: Yup.string()
            .min(2, 'At least one tag is required')
            .required('Tags are required')
    });

    const handleImageChange = (event, setFieldValue) => {
        const file = event.target.files[0];
        if (!file) return;

        setFieldValue('image', file);

        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (values, { resetForm }) => {
        setIsSubmitting(true);
        setSubmitMessage('');

        try {
            // Prepare post data
            const postData = {
                title: values.heading,
                content: values.content,
                category: values.topic,
                tags: values.tags.split(',').map(tag => tag.trim()),
                image: imagePreview,
                author: user.email,
                authorId: user.id,
                published: true,
                createdAt: new Date().toISOString(),
            };

            // Call API
            await addPost(postData).unwrap();
            setSubmitMessage('Article published successfully!');
            resetForm();
            setImagePreview(null);
        } catch (error) {
            console.error('Publish error:', error);
            setSubmitMessage('Failed to publish article. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
                <h2 className="text-2xl font-bold text-white flex items-center">
                    <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add New Article
                </h2>
                <p className="text-blue-100 mt-2">Create and publish a new article for your blog</p>
            </div>

            <div className="p-8">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched, setFieldValue }) => (
                        <Form className="space-y-6">
                            {/* Topic and Heading Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Topic */}
                                <div className="group">
                                    <label
                                        htmlFor="topic"
                                        className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 transition-colors group-focus-within:text-blue-600"
                                    >
                                        Topic Category
                                    </label>
                                    <Field
                                        as="select"
                                        name="topic"
                                        id="topic"
                                        className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-300 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                                            errors.topic && touched.topic
                                                ? 'border-red-500 bg-red-50'
                                                : 'border-gray-300 hover:border-gray-400'
                                        }`}
                                    >
                                        <option value="">Select a topic</option>
                                        <option value="technology">Technology</option>
                                        <option value="lifestyle">Lifestyle</option>
                                        <option value="business">Business</option>
                                        <option value="health">Health</option>
                                        <option value="travel">Travel</option>
                                        <option value="food">Food</option>
                                        <option value="sports">Sports</option>
                                        <option value="entertainment">Entertainment</option>
                                    </Field>
                                    <ErrorMessage
                                        name="topic"
                                        component="div"
                                        className="text-red-500 text-sm mt-1 animate-pulse"
                                    />
                                </div>

                                {/* Heading */}
                                <div className="group">
                                    <label
                                        htmlFor="heading"
                                        className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 transition-colors group-focus-within:text-blue-600"
                                    >
                                        Article Heading
                                    </label>
                                    <Field
                                        type="text"
                                        name="heading"
                                        id="heading"
                                        placeholder="Enter article heading..."
                                        className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-300 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                                            errors.heading && touched.heading
                                                ? 'border-red-500 bg-red-50'
                                                : 'border-gray-300 hover:border-gray-400'
                                        }`}
                                    />
                                    <ErrorMessage
                                        name="heading"
                                        component="div"
                                        className="text-red-500 text-sm mt-1 animate-pulse"
                                    />
                                </div>
                            </div>

                            {/* Content */}
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
                                    rows="8"
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

                            {/* Image Upload */}
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

                            {/* Tags */}
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
                                    placeholder="Enter tags separated by commas (e.g., react, javascript, web development)"
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

                            {/* Submit Button */}
                            <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex items-center space-x-4">
                                    {submitMessage && (
                                        <div className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                                            submitMessage.includes('successfully')
                                                ? 'bg-green-100 text-green-700 border border-green-300'
                                                : 'bg-red-100 text-red-700 border border-red-300'
                                        }`}>
                                            {submitMessage}
                                        </div>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Publishing...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                            </svg>
                                            Publish Article
                                        </>
                                    )}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default AddArticle;