import React from 'react';
import { useGetPostsQuery } from '../features/post/postApiSlice';
import { formatDate } from '../utils/helpers';

const Home = () => {
    const { data: posts = [], isLoading} = useGetPostsQuery();

    // Get featured and recent posts
    const featuredPost = posts.find(post => post.featured) || posts[0];
    const regularPosts = posts.filter(post => post !== featuredPost).slice(0, 3);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-20">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fadeInUp">
                        Welcome to <span className="text-yellow-300">Bloggy</span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
                        Discover amazing stories, insights, and knowledge from our community of passionate writers
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp" style={{animationDelay: '0.4s'}}>
                        <a
                            href="/articles"
                            className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                        >
                            Explore Articles
                        </a>
                        <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105">
                            Join Community
                        </button>
                    </div>
                </div>
            </section>

            {/* Recent Posts Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Latest Articles
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Stay updated with our newest content covering technology, lifestyle, and more
                        </p>
                    </div>

                    {isLoading ? (
                        /* Loading Skeleton */
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            <div className="lg:col-span-8">
                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden animate-pulse">
                                    <div className="w-full h-96 bg-gray-300 dark:bg-gray-700"></div>
                                    <div className="p-8">
                                        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
                                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-4 space-y-6">
                                {[...Array(3)].map((_, index) => (
                                    <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden animate-pulse">
                                        <div className="flex">
                                            <div className="w-24 h-24 bg-gray-300 dark:bg-gray-700"></div>
                                            <div className="p-4 flex-1">
                                                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                                                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            {/* Featured Post */}
                            {featuredPost && (
                                <div className="lg:col-span-8">
                                    <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl group">
                                        {featuredPost.image ? (
                                            <div className="relative overflow-hidden">
                                                <img
                                                    src={featuredPost.image}
                                                    alt={featuredPost.title}
                                                    className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                                                <div className="absolute top-6 left-6">
                          <span className="px-3 py-1 bg-yellow-500 text-black text-sm font-bold rounded-full">
                            ⭐ Featured
                          </span>
                                                </div>
                                                <div className="absolute bottom-6 left-6 right-6 text-white">
                          <span className="px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full">
                            {featuredPost.category || 'General'}
                          </span>
                                                    <h3 className="text-2xl md:text-3xl font-bold mt-4 mb-2">
                                                        {featuredPost.title}
                                                    </h3>
                                                    <p className="text-gray-200 mb-4">
                                                        {featuredPost.content?.substring(0, 150) + '...' || 'No content available'}
                                                    </p>
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center">
                                                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                                <span className="text-white text-sm font-semibold">
                                  {featuredPost.author?.charAt(0) || 'A'}
                                </span>
                                                            </div>
                                                            <div>
                                                                <p className="font-semibold">{featuredPost.author || 'Anonymous'}</p>
                                                                <p className="text-sm text-gray-300">
                                                                    {formatDate(featuredPost.createdAt)} • {Math.ceil(featuredPost.content?.length / 1000) || 5} min read
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <button className="px-6 py-2 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200 transform hover:scale-105">
                                                            Read More
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="p-8">
                                                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                                                    {featuredPost.title}
                                                </h3>
                                                <p className="text-gray-700 dark:text-gray-300 mb-6">
                                                    {featuredPost.content?.substring(0, 250) + '...' || 'No content available'}
                                                </p>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                              <span className="text-white text-sm font-semibold">
                                {featuredPost.author?.charAt(0) || 'A'}
                              </span>
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold">{featuredPost.author || 'Anonymous'}</p>
                                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                                {formatDate(featuredPost.createdAt)} • {Math.ceil(featuredPost.content?.length / 1000) || 5} min read
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105">
                                                        Read More
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </article>
                                </div>
                            )}

                            {/* Recent Posts Sidebar */}
                            <div className="lg:col-span-4">
                                <div className="space-y-6">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white border-b-2 border-blue-600 pb-2">
                                        Recent Posts
                                    </h3>

                                    {regularPosts.map((post, index) => (
                                        <article
                                            key={post.id}
                                            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl group"
                                            style={{
                                                animationDelay: `${index * 100}ms`
                                            }}
                                        >
                                            <div className="flex">
                                                {post.image ? (
                                                    <div className="relative w-24 h-24 overflow-hidden">
                                                        <img
                                                            src={post.image}
                                                            alt={post.title}
                                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                                        <span className="text-gray-500 text-2xl">📝</span>
                                                    </div>
                                                )}
                                                <div className="p-4 flex-1">
                                                    <div className="flex items-center justify-between mb-2">
                            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xs font-semibold rounded">
                              {post.category || 'General'}
                            </span>
                                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                              {formatDate(post.createdAt)}
                            </span>
                                                    </div>
                                                    <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                                                        {post.title}
                                                    </h4>
                                                    <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {Math.ceil(post.content?.length / 1000) || 3} min read
                            </span>
                                                        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-xs font-medium transition-colors duration-200">
                                                            Read →
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </div>

                                {/* Call to Action */}
                                <div className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white text-center">
                                    <h4 className="font-bold text-lg mb-2">Want to see more?</h4>
                                    <p className="text-blue-100 mb-4 text-sm">
                                        Explore our full collection of articles
                                    </p>
                                    <a
                                        href="/articles"
                                        className="px-6 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                                    >
                                        View All Articles
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-16 bg-white dark:bg-gray-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        Stay Updated
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                        Subscribe to our newsletter and never miss a new article
                    </p>
                    <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                        />
                        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;