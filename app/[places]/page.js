import React from 'react';
import { Home, Frown } from 'lucide-react';
import Link from 'next/link';

/**
 * A user-friendly "404 Not Found" page component.
 * This is displayed when a user navigates to a route that does not exist.
 */
export default function NotFoundPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md text-center bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <div className="mb-6">
          <Frown className="mx-auto h-24 w-24 text-orange-400" strokeWidth={1.5} />
        </div>
        
        <h1 className="text-7xl md:text-8xl font-bold text-gray-800 mb-2">
          404
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-gray-500 mb-8 leading-relaxed">
          Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or maybe you just mistyped the URL.
        </p>
        
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        >
          <Home className="w-5 h-5 mr-2" />
          <span>Go Back Home</span>
        </Link>
      </div>
    </div>
  );
}
