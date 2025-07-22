'use client';

import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import StarRating from '@/components/ui/StarRating';
import Badge from '@/components/ui/Badge';
import { useBookmarks } from '@/contexts/BookmarkContext';
import { getPerformanceLabel } from '@/lib/utils';

export default function EmployeeCard({ employee }) {
  const router = useRouter();
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const performanceLabel = getPerformanceLabel(employee.rating);

  const handleBookmarkToggle = () => {
    if (isBookmarked(employee.id)) {
      removeBookmark(employee.id);
    } else {
      addBookmark(employee);
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="flex flex-col space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {employee.fullName}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{employee.email}</p>
          </div>
          <Badge color={performanceLabel.color}>
            {performanceLabel.label}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">Department:</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {employee.department}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">Age:</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {employee.age}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">Performance:</span>
            <StarRating rating={employee.rating} size="small" />
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            onClick={() => router.push(`/employee/${employee.id}`)}
            variant="primary"
            size="small"
          >
            View
          </Button>
          <Button
            onClick={handleBookmarkToggle}
            variant="secondary"
            size="small"
          >
            {isBookmarked(employee.id) ? 'Unbookmark' : 'Bookmark'}
          </Button>
          <Button
            onClick={() => alert(`Promoting ${employee.fullName}`)}
            variant="secondary"
            size="small"
          >
            Promote
          </Button>
        </div>
      </div>
    </Card>
  );
}