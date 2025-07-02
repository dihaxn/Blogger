import React from 'react';

const About = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-32">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="relative max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 font-serif">About Bloggy</h1>
                    <p className="text-xl md:text-2xl leading-relaxed opacity-90">
                        Where stories come alive and ideas find their voice
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-6 py-16">
                {/* Our Story Section */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                    <div>
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 font-serif">Our Story</h2>
                        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                            Founded in 2023, Bloggy emerged from a simple belief: everyone has a story worth telling. 
                            What started as a small community of passionate writers has grown into a vibrant platform 
                            where creativity meets technology.
                        </p>
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                            We're not just another blogging platform. We're a community that celebrates diverse voices, 
                            innovative ideas, and the power of authentic storytelling.
                        </p>
                    </div>
                    <div className="relative">
                        <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl p-8 shadow-xl">
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
                                <div className="text-4xl mb-4">📚</div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">10,000+</h3>
                                <p className="text-gray-600 dark:text-gray-400">Stories Published</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mission Section */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 shadow-lg mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 font-serif">Our Mission</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                            To democratize storytelling and create a platform where every voice can be heard, 
                            every idea can flourish, and every story can inspire.
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">✍️</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Empower Writers</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Providing tools and community support to help writers reach their full potential.
                            </p>
                        </div>
                        
                        <div className="text-center">
                            <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🌍</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Global Community</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Connecting readers and writers from around the world through shared stories.
                            </p>
                        </div>
                        
                        <div className="text-center">
                            <div className="bg-purple-100 dark:bg-purple-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">💡</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Inspire Innovation</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Fostering creativity and pushing the boundaries of digital storytelling.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Team Section */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 font-serif">Meet Our Team</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            The passionate individuals behind Bloggy
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
                            <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                                JS
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Jane Smith</h3>
                            <p className="text-blue-600 dark:text-blue-400 mb-3">Founder & CEO</p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                Passionate about connecting writers and readers through innovative technology.
                            </p>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
                            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                                MD
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Mike Davis</h3>
                            <p className="text-green-600 dark:text-green-400 mb-3">Head of Content</p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                Curating amazing content and supporting our community of writers.
                            </p>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
                            <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                                SL
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Sarah Lee</h3>
                            <p className="text-purple-600 dark:text-purple-400 mb-3">Lead Developer</p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                Building the technical infrastructure that powers our platform.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Values Section */}
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-12 text-white">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-6 font-serif">Our Values</h2>
                        <p className="text-xl opacity-90">
                            The principles that guide everything we do
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="flex items-start space-x-4">
                            <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="text-xl">🎯</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Authenticity</h3>
                                <p className="opacity-90">We believe in genuine voices and authentic storytelling that resonates with real experiences.</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start space-x-4">
                            <div className="bg-green-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="text-xl">🤝</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Community</h3>
                                <p className="opacity-90">Building connections and fostering meaningful relationships between writers and readers.</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start space-x-4">
                            <div className="bg-purple-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="text-xl">🚀</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                                <p className="opacity-90">Continuously evolving and improving the blogging experience through technology.</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start space-x-4">
                            <div className="bg-orange-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="text-xl">🌟</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Excellence</h3>
                                <p className="opacity-90">Striving for the highest quality in everything we create and every service we provide.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;