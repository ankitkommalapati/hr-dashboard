'use client';

import { useState, useEffect } from 'react';
import { getRandomDepartment, getRandomRating } from '@/lib/utils';

export function useEmployees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://dummyjson.com/users?limit=20');
      const data = await response.json();
      
      const enrichedUsers = data.users.map(user => ({
        ...user,
        department: getRandomDepartment(),
        rating: getRandomRating(),
        fullName: `${user.firstName} ${user.lastName}`
      }));
      
      setEmployees(enrichedUsers);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { employees, loading, error, refetch: fetchEmployees };
}