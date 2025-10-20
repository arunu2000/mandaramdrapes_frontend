// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link only here

const NotFound = () => (
    <div className="text-center py-40">
        <h1 className="text-6xl font-extrabold text-red-600 mb-4">404</h1>
        <p className="text-xl text-gray-700">Oops! The page you're looking for doesn't exist.</p>
        <Link to="/" className="mt-6 inline-block text-blue-600 hover:text-blue-800 transition duration-150">
            Go to Home
        </Link>
    </div>
);

export default NotFound;