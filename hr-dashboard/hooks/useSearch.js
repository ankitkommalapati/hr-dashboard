'use client';

import { useState, useMemo } from 'react';

export function useSearch(items, searchFields) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    departments: [],
    ratings: []
  });

  const filteredItems = useMemo(() => {
    let filtered = items;

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(item =>
        searchFields.some(field =>
          item[field]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply department filter
    if (filters.departments.length > 0) {
      filtered = filtered.filter(item =>
        filters.departments.includes(item.department)
      );
    }

    // Apply rating filter
    if (filters.ratings.length > 0) {
      filtered = filtered.filter(item =>
        filters.ratings.includes(item.rating)
      );
    }

    return filtered;
  }, [items, searchTerm, filters, searchFields]);

  return {
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    filteredItems
  };
}