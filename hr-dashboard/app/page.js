'use client';

import { useState } from 'react';
import { useEmployees } from '@/hooks/useEmployees';
import { useSearch } from '@/hooks/useSearch';
import EmployeeCard from '@/components/dashboard/EmployeeCard';
import SearchBar from '@/components/ui/SearchBar';
import FilterDropdown from '@/components/ui/FilterDropdown';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import CreateUserForm from '@/components/dashboard/CreateUserForm';
import { getRandomRating } from '@/lib/utils';

export default function Home() {
  const { employees, loading, error } = useEmployees();
  const { searchTerm, setSearchTerm, filters, setFilters, filteredItems } = useSearch(
    employees,
    ['fullName', 'email', 'department']
  );
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreateUser = (userData) => {
    // In a real app, this would make an API call
    const newUser = {
      ...userData,
      id: Date.now(),
      fullName: `${userData.firstName} ${userData.lastName}`,
      rating: getRandomRating(),
      image: `https://ui-avatars.com/api/?name=${userData.firstName}+${userData.lastName}&background=random`
    };
    
    // For demo purposes, just show an alert
    alert(`Employee ${newUser.fullName} created successfully!`);
    setIsCreateModalOpen(false);
    
    // In a real app, you would update the employees list
    // setEmployees([...employees, newUser]);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Error loading employees: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <h1 className="text-2xl font-bold">Employee Directory</h1>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search by name, email, or department..."
          />
          <FilterDropdown filters={filters} setFilters={setFilters} />
          <Button onClick={() => setIsCreateModalOpen(true)} variant="primary">
            + Add Employee
          </Button>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          No employees found matching your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(employee => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>
      )}

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Employee"
      >
        <CreateUserForm
          onSubmit={handleCreateUser}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>
    </div>
  );
}