'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import StarRating from '@/components/ui/StarRating';
import Badge from '@/components/ui/Badge';
import { getPerformanceLabel, generateMockProjects, generateMockFeedback, getRandomDepartment, getRandomRating } from '@/lib/utils';

export default function EmployeeDetail() {
  const params = useParams();
  const router = useRouter();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchEmployee();
  }, [params.id]);

  const fetchEmployee = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://dummyjson.com/users/${params.id}`);
      const data = await response.json();
      
      setEmployee({
        ...data,
        department: getRandomDepartment(),
        rating: getRandomRating(),
        fullName: `${data.firstName} ${data.lastName}`,
        bio: 'Dedicated professional with extensive experience in their field. Known for strong work ethic and collaborative approach.',
        projects: generateMockProjects(),
        feedback: generateMockFeedback(),
        performanceHistory: [
          { year: '2023', rating: 4.5 },
          { year: '2022', rating: 4.2 },
          { year: '2021', rating: 3.8 },
        ]
      });
    } catch (err) {
      console.error('Error fetching employee:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!employee) {
    return <div className="text-center">Employee not found</div>;
  }

  const performanceLabel = getPerformanceLabel(employee.rating);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'projects', label: 'Projects' },
    { id: 'feedback', label: 'Feedback' },
  ];

  return (
    <div className="space-y-6">
      <Button onClick={() => router.back()} variant="secondary" size="small">
        ← Back
      </Button>

      <Card>
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={employee.image}
            alt={employee.fullName}
            className="w-32 h-32 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {employee.fullName}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">{employee.email}</p>
                <p className="text-gray-600 dark:text-gray-400">{employee.phone}</p>
              </div>
              <Badge color={performanceLabel.color}>
                {performanceLabel.label}
              </Badge>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Department</span>
                <p className="font-medium">{employee.department}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Age</span>
                <p className="font-medium">{employee.age}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Performance</span>
                <StarRating rating={employee.rating} />
              </div>
            </div>

            <div className="mt-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">Address</span>
              <p className="font-medium">
                {employee.address.address}, {employee.address.city}, {employee.address.state} {employee.address.postalCode}
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Bio</h3>
                <p className="text-gray-600 dark:text-gray-400">{employee.bio}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Performance History</h3>
                <div className="space-y-2">
                  {employee.performanceHistory.map(history => (
                    <div key={history.year} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                      <span className="font-medium">{history.year}</span>
                      <div className="flex items-center gap-2">
                        <StarRating rating={Math.floor(history.rating)} size="small" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {history.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Assigned Projects</h3>
              {employee.projects.map(project => (
                <div key={project.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{project.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Role: {project.role}</p>
                    </div>
                    <Badge color={project.status === 'Completed' ? 'bg-green-500' : 'bg-blue-500'}>
                      {project.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'feedback' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Recent Feedback</h3>
              {employee.feedback.map(item => (
                <div key={item.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-300 mb-2">{item.text}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>From: {item.from}</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}