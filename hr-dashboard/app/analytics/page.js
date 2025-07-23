'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Card from '@/components/ui/Card';
import { departments, getRandomRating } from '@/lib/utils';

// Dynamically import Chart components to avoid SSR issues
const Chart = dynamic(() => import('react-chartjs-2').then(mod => mod.Chart), { ssr: false });
const Bar = dynamic(() => import('react-chartjs-2').then(mod => mod.Bar), { ssr: false });
const Line = dynamic(() => import('react-chartjs-2').then(mod => mod.Line), { ssr: false });
const Doughnut = dynamic(() => import('react-chartjs-2').then(mod => mod.Doughnut), { ssr: false });

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function AnalyticsPage() {
  const [chartData, setChartData] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    generateChartData();
  }, []);

  const generateChartData = () => {
    // Generate department ratings
    const departmentRatings = departments.map(dept => ({
      department: dept,
      avgRating: (Math.random() * 2 + 3).toFixed(1), // 3.0 to 5.0
      employeeCount: Math.floor(Math.random() * 20) + 5
    }));

    // Generate bookmark trends (last 7 days)
    const bookmarkTrends = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return {
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        count: Math.floor(Math.random() * 10) + 2
      };
    });

    // Performance distribution
    const performanceDistribution = {
      excellent: Math.floor(Math.random() * 30) + 10,
      good: Math.floor(Math.random() * 40) + 20,
      average: Math.floor(Math.random() * 20) + 10,
      needsImprovement: Math.floor(Math.random() * 10) + 5
    };

    setChartData({
      departmentRatings,
      bookmarkTrends,
      performanceDistribution
    });
  };

  if (!mounted || !chartData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  const barChartData = {
    labels: chartData.departmentRatings.map(d => d.department),
    datasets: [{
      label: 'Average Rating',
      data: chartData.departmentRatings.map(d => parseFloat(d.avgRating)),
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
      borderColor: 'rgba(59, 130, 246, 1)',
      borderWidth: 1
    }]
  };

  const lineChartData = {
    labels: chartData.bookmarkTrends.map(d => d.date),
    datasets: [{
      label: 'Bookmarks',
      data: chartData.bookmarkTrends.map(d => d.count),
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  const doughnutChartData = {
    labels: ['Excellent', 'Good', 'Average', 'Needs Improvement'],
    datasets: [{
      data: [
        chartData.performanceDistribution.excellent,
        chartData.performanceDistribution.good,
        chartData.performanceDistribution.average,
        chartData.performanceDistribution.needsImprovement
      ],
      backgroundColor: [
        'rgba(34, 197, 94, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(251, 191, 36, 0.8)',
        'rgba(239, 68, 68, 0.8)'
      ],
      borderWidth: 1
    }]
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="text-center">
          <h3 className="text-lg font-semibold mb-2">Total Employees</h3>
          <p className="text-3xl font-bold text-primary-600">120</p>
        </Card>
        <Card className="text-center">
          <h3 className="text-lg font-semibold mb-2">Avg Performance</h3>
          <p className="text-3xl font-bold text-green-600">4.2</p>
        </Card>
        <Card className="text-center">
          <h3 className="text-lg font-semibold mb-2">Total Bookmarks</h3>
          <p className="text-3xl font-bold text-blue-600">45</p>
        </Card>
                <Card className="text-center">
          <h3 className="text-lg font-semibold mb-2">Promotions This Month</h3>
          <p className="text-3xl font-bold text-purple-600">8</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-semibold mb-4">Department Performance</h2>
          <div className="h-64">
            <Bar
              data={barChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 5
                  }
                }
              }}
            />
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4">Bookmark Trends (Last 7 Days)</h2>
          <div className="h-64">
            <Line
              data={lineChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }}
            />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-semibold mb-4">Performance Distribution</h2>
          <div className="h-64 flex justify-center">
            <div className="w-64">
              <Doughnut
                data={doughnutChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: true
                }}
              />
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4">Top Performers</h2>
          <div className="space-y-3">
            {[
              { name: 'John Doe', department: 'Engineering', rating: 4.9 },
              { name: 'Jane Smith', department: 'Marketing', rating: 4.8 },
              { name: 'Mike Johnson', department: 'Sales', rating: 4.7 },
              { name: 'Sarah Williams', department: 'HR', rating: 4.6 },
              { name: 'Tom Brown', department: 'Finance', rating: 4.5 }
            ].map((performer, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <p className="font-medium">{performer.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{performer.department}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{performer.rating}</span>
                  <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}