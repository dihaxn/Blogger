import React, { useState, useEffect } from 'react';

const Articles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    // Mock data - replace with API call
    const mockArticles = [
        {
            id: 1,
            title: "Getting Started with React 18",
            content: "React 18 introduces several new features that make building user interfaces even more powerful and efficient...",
            category: "technology",
            author: "John Doe",
            publishDate: "2024-01-15",
            readTime: "5 min read",
            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
            tags: ["react", "javascript", "frontend"],
            likes: 45,
            views: 1200
        },
        {
            id: 2,
            title: "The Art of Minimalist Living",
            content: "Discover how minimalism can transform your life and bring more focus to what truly matters...",
            category: "lifestyle",
            author: "Jane Smith",
            publishDate: "2024-01-10",
            readTime: "8 min read",
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
            tags: ["minimalism", "lifestyle", "wellness"],
            likes: 67,
            views: 890
        },
        {
            id: 3,
            title: "Building Scalable Node.js Applications",
            content: "Learn the best practices for creating robust and scalable backend applications with Node.js...",
            category: "technology",
            author: "Mike Johnson",
            publishDate: "2024-01-08",
            readTime: "12 min read",
            image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800",
            tags: ["nodejs", "backend", "scalability"],
            likes: 89,
            views: 1500
        },
        {
            id: 4,
            title: "Healthy Meal Prep Ideas",
            content: "Transform your weekly routine with these delicious and nutritious meal prep ideas that save time and money...",
            category: "health",
            author: "Sarah Wilson",
            publishDate: "2024-01-05",
            readTime: "6 min read",
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800",
            tags: ["health", "nutrition", "meal-prep"],
            likes: 124,
            views: 2100
        },
        {
            id: 5,
            title: "Remote Work Best Practices",
            content: "Essential tips and strategies for maintaining productivity and work-life balance while working remotely...",
            category: "business",
            author: "David Brown",
            publishDate: "2024-01-03",
            readTime: "7 min read",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800",
            tags: ["remote-work", "productivity", "business"],
            likes: 78,
            views: 1350
        },
        {
            id: 6,
            title: "Travel Photography Tips",
            content: "Capture stunning memories from your adventures with these professional photography techniques...",
            category: "travel",
            author: "Emma Davis",
            publishDate: "2024-01-01",
            readTime: "10 min read",
            image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800",
            tags: ["travel", "photography", "tips"],
            likes: 156,
            views: 2800
        }
    ];

    const categories = [
        { id: 'all', name: 'All Articles', icon: '📚' },
        { id: 'technology', name: 'Technology', icon: '💻' },
        { id: 'lifestyle', name: 'Lifestyle', icon: '🌱' },
        { id: 'health', name: 'Health', icon: '🏥' },
        { id: 'business', name: 'Business', icon: '💼' },
        { id: 'travel', name: 'Travel', icon: '✈️' }
    ];

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setArticles(mockArticles);
            setLoading(false);
        }, 1000);
    }, []);

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

    if (loading) {
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

                                        <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105">
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
        </div>
    );
};

export default Articles;