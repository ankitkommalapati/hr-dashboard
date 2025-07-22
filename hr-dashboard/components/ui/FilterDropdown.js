'use client';

import { useState } from 'react';
import { departments } from '@/lib/utils';

export default function FilterDropdown({ filters, setFilters }) {
  const [isOpen, setIsOpen] = useState(false);
  const ratings = [1, 2, 3, 4, 5];

  const handleDepartmentChange = (dept) => {
    const newDepts = filters.departments.includes(dept)
      ? filters.departments.filter(d => d !== dept)
      : [...filters.departments, dept];
    setFilters({ ...filters, departments: newDepts });
  };

  const handleRatingChange = (rating) => {
    const newRatings = filters.ratings.includes(rating)
      ? filters.ratings.filter(r => r !== rating)
      : [...filters.ratings, rating];
    setFilters({ ...filters, ratings: newRatings });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        Filters
        {(filters.departments.length + filters.ratings.length) > 0 && (
          <span className="bg-primary-500 text-white text-xs rounded-full px-2 py-1">
            {filters.departments.length + filters.ratings.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-64 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-10">
          <div className="p-4">
            <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Departments</h3>
            {departments.map(dept => (
              <label key={dept} className="flex items-center gap-2 mb-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.departments.includes(dept)}
                  onChange={() => handleDepartmentChange(dept)}
                  className="rounded text-primary-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{dept}</span>
              </label>
            ))}

            <h3 className="font-semibold mb-3 mt-4 text-gray-900 dark:text-white">Ratings</h3>
            {ratings.map(rating => (
              <label key={rating} className="flex items-center gap-2 mb-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.ratings.includes(rating)}
                  onChange={() => handleRatingChange(rating)}
                  className="rounded text-primary-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{rating} Stars</span>
              </label>
            ))}

            <button
              onClick={() => setFilters({ departments: [], ratings: [] })}
              className="mt-4 text-sm text-primary-500 hover:text-primary-600"
            >
              Clear all
            </button>
          </div>
        </div>
      )}
    </div>
  );
}