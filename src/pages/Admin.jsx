import React, { useState } from 'react';
import AddArticle from "../components/AddArticleForm.jsx";

const Admin = () => {
    const [activeTab, setActiveTab] = useState('add-article');

    const tabs = [
        { id: 'add-article', name: 'Add Article', icon: '📝' },
        { id: 'manage-articles', name: 'Manage Articles', icon: '📚' },
        { id: 'users', name: 'Users', icon: '👥' },
        { id: 'analytics', name: 'Analytics', icon: '📊' }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Admin Dashboard
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Manage your blog content and settings
                    </p>
                </div>

                {/* Tab Navigation */}
                <div className="mb-8">
                    <div className="border-b border-gray-200 dark:border-gray-700">
                        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${
                                        activeTab === tab.id
                                            ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                                    }`}
                                >
                                    <span className="mr-2 text-lg">{tab.icon}</span>
                                    {tab.name}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="transition-all duration-300">
                    {activeTab === 'add-article' && (
                        <div className="animate-fadeIn">
                            <AddArticle />
                        </div>
                    )}

                    {activeTab === 'manage-articles' && (
                        <div className="animate-fadeIn">
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                    Manage Articles
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Article management functionality coming soon...
                                </p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'users' && (
                        <div className="animate-fadeIn">
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                    User Management
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    User management functionality coming soon...
                                </p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'analytics' && (
                        <div className="animate-fadeIn">
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                    Analytics Dashboard
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Analytics functionality coming soon...
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Admin;