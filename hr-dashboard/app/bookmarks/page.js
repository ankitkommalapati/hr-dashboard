'use client';

import { useBookmarks } from '@/contexts/BookmarkContext';
import EmployeeCard from '@/components/dashboard/EmployeeCard';
import Button from '@/components/ui/Button';

export default function BookmarksPage() {
  const { bookmarks, removeBookmark } = useBookmarks();

  if (bookmarks.length === 0) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Bookmarked Employees</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          You have not bookmarked any employees yet.
        </p>
        <Button onClick={() => window.location.href = '/'} variant="primary">
          Browse Employees
        </Button>
      </div>
    );
  }

  const handleAssignProject = (employee) => {
    alert(`Assigning ${employee.fullName} to a new project`);
  };

  const handlePromote = (employee) => {
    alert(`Promoting ${employee.fullName}`);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Bookmarked Employees ({bookmarks.length})</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookmarks.map(employee => (
          <div key={employee.id} className="relative">
            <EmployeeCard employee={employee} />
            <div className="mt-2 flex gap-2">
              <Button
                onClick={() => handleAssignProject(employee)}
                variant="primary"
                size="small"
                className="flex-1"
              >
                Assign to Project
              </Button>
              <Button
                onClick={() => handlePromote(employee)}
                variant="secondary"
                size="small"
                className="flex-1"
              >
                Promote
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}