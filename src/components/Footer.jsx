import React from 'react';

const Footer = () => {
    return (
        <div className="bottom-0 left-0 right-0 z-50 max-w-full m-0">
            <footer className="bg-white rounded-lg shadow-sm dark:bg-gray-900 ">
                <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                            <span className="self-center text-xl font-semibold font-serif whitespace-nowrap dark:text-white">Bloggy</span>
                        </a>
                        <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                            <li>
                                <a href="about" className="hover:underline me-4 md:me-6">About</a>
                            </li>
                            <li>
                                <a href="about" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="about" className="hover:underline me-4 md:me-6">Licensing</a>
                            </li>
                        </ul>
                    </div>
                    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                    <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025 Bloggy™. All Rights Reserved.</span>
                </div>
            </footer>
        </div>
    );
};

export default Footer;