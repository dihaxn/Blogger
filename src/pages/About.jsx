import React, { useState, useEffect } from 'react';

const About = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate content loading
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1200);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-50">
                <div className="flex flex-col items-center">
                    <div className="animate-pulse text-5xl mb-4">📝</div>
                    <div className="w-48 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 animate-loading-bar"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-32">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20 animate-fadeIn">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="relative max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 font-serif transform transition-transform duration-500 hover:scale-105">
                        About Bloggy
                    </h1>
                    <p className="text-xl md:text-2xl leading-relaxed opacity-90 transform transition-all duration-500 hover:opacity-100">
                        Where stories come alive and ideas find their voice
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-6 py-16">
                {/* Our Story Section */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-20 animate-fadeInUp">
                    <div className="transition-all duration-500 hover:-translate-y-1">
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 font-serif transform transition-transform duration-500 hover:scale-105">
                            Our Story
                        </h2>
                        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed transition-opacity duration-500 hover:opacity-100 opacity-90">
                            Founded in 2023, Bloggy emerged from a simple belief: everyone has a story worth telling.
                            What started as a small community of passionate writers has grown into a vibrant platform
                            where creativity meets technology.
                        </p>
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed transition-opacity duration-500 hover:opacity-100 opacity-90">
                            We're not just another blogging platform. We're a community that celebrates diverse voices,
                            innovative ideas, and the power of authentic storytelling.
                        </p>
                    </div>
                    <div className="relative transition-all duration-500 hover:scale-[1.02]">
                        <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl p-8 shadow-xl transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center transform transition-all duration-500 hover:scale-105">
                                <div className="text-4xl mb-4 animate-bounce">📚</div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">10,000+</h3>
                                <p className="text-gray-600 dark:text-gray-400">Stories Published</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mission Section */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 shadow-lg mb-20 animate-fadeInUp animation-delay-200">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 font-serif transform transition-transform duration-500 hover:scale-105">
                            Our Mission
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto transition-opacity duration-500 hover:opacity-100 opacity-90">
                            To democratize storytelling and create a platform where every voice can be heard,
                            every idea can flourish, and every story can inspire.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: '✍️', title: 'Empower Writers',
                                desc: 'Providing tools and community support to help writers reach their full potential.' },
                            { icon: '🌍', title: 'Global Community',
                                desc: 'Connecting readers and writers from around the world through shared stories.' },
                            { icon: '💡', title: 'Inspire Innovation',
                                desc: 'Fostering creativity and pushing the boundaries of digital storytelling.' }
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-700 transition-all duration-500 hover:bg-white dark:hover:bg-gray-600 hover:shadow-lg hover:-translate-y-2"
                            >
                                <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-500">
                                    <span className="text-2xl">{item.icon}</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Team Section */}
                <div className="mb-20 animate-fadeInUp animation-delay-400">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 font-serif transform transition-transform duration-500 hover:scale-105">
                            Meet Our Team
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 transition-opacity duration-500 hover:opacity-100 opacity-90">
                            The passionate individuals behind Bloggy
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { initials: 'JS', name: 'Jane Smith', role: 'Founder & CEO',
                                desc: 'Passionate about connecting writers and readers through innovative technology.',
                                color: 'from-blue-400 to-blue-600' },
                            { initials: 'MD', name: 'Mike Davis', role: 'Head of Content',
                                desc: 'Curating amazing content and supporting our community of writers.',
                                color: 'from-green-400 to-green-600' },
                            { initials: 'SL', name: 'Sarah Lee', role: 'Lead Developer',
                                desc: 'Building the technical infrastructure that powers our platform.',
                                color: 'from-purple-400 to-purple-600' }
                        ].map((member, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center transform transition-all duration-500 hover:-translate-y-3 hover:shadow-xl"
                            >
                                <div className={`bg-gradient-to-br ${member.color} w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold transition-all duration-500 hover:scale-110`}>
                                    {member.initials}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{member.name}</h3>
                                <p className="text-blue-600 dark:text-blue-400 mb-3">{member.role}</p>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    {member.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Values Section */}
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-12 text-white animate-fadeInUp animation-delay-600">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-6 font-serif transform transition-transform duration-500 hover:scale-105">
                            Our Values
                        </h2>
                        <p className="text-xl opacity-90 transition-opacity duration-500 hover:opacity-100">
                            The principles that guide everything we do
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            { icon: '🎯', title: 'Authenticity',
                                desc: 'We believe in genuine voices and authentic storytelling that resonates with real experiences.',
                                color: 'bg-blue-600' },
                            { icon: '🤝', title: 'Community',
                                desc: 'Building connections and fostering meaningful relationships between writers and readers.',
                                color: 'bg-green-600' },
                            { icon: '🚀', title: 'Innovation',
                                desc: 'Continuously evolving and improving the blogging experience through technology.',
                                color: 'bg-purple-600' },
                            { icon: '🌟', title: 'Excellence',
                                desc: 'Striving for the highest quality in everything we create and every service we provide.',
                                color: 'bg-orange-600' }
                        ].map((value, index) => (
                            <div
                                key={index}
                                className="flex items-start space-x-4 transition-all duration-500 hover:-translate-y-2"
                            >
                                <div className={`${value.color} w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-500 hover:rotate-6`}>
                                    <span className="text-xl">{value.icon}</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2 transform transition-transform duration-500 hover:translate-x-1">
                                        {value.title}
                                    </h3>
                                    <p className="opacity-90 transition-opacity duration-500 hover:opacity-100">
                                        {value.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;