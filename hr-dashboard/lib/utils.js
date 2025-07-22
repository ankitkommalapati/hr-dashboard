export const departments = [
  'Engineering',
  'Marketing',
  'Sales',
  'HR',
  'Finance',
  'Operations'
];

export const getRandomDepartment = () => {
  return departments[Math.floor(Math.random() * departments.length)];
};

export const getRandomRating = () => {
  return Math.floor(Math.random() * 5) + 1;
};

export const getPerformanceLabel = (rating) => {
  if (rating >= 4.5) return { label: 'Excellent', color: 'bg-green-500' };
  if (rating >= 3.5) return { label: 'Good', color: 'bg-blue-500' };
  if (rating >= 2.5) return { label: 'Average', color: 'bg-yellow-500' };
  return { label: 'Needs Improvement', color: 'bg-red-500' };
};

export const generateMockProjects = () => {
  const projects = [
    'Dashboard Redesign',
    'API Integration',
    'Mobile App Development',
    'Data Migration',
    'Customer Portal'
  ];
  
  return Array.from({ length: 3 }, (_, i) => ({
    id: i + 1,
    name: projects[Math.floor(Math.random() * projects.length)],
    status: Math.random() > 0.5 ? 'Completed' : 'In Progress',
    role: ['Lead', 'Contributor', 'Reviewer'][Math.floor(Math.random() * 3)]
  }));
};

export const generateMockFeedback = () => {
  const feedback = [
    'Great team player and always delivers on time.',
    'Shows excellent problem-solving skills.',
    'Could improve communication with stakeholders.',
    'Demonstrates strong leadership qualities.',
    'Very detail-oriented and thorough.'
  ];
  
  return Array.from({ length: 3 }, (_, i) => ({
    id: i + 1,
    text: feedback[Math.floor(Math.random() * feedback.length)],
    date: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
    from: ['Manager', 'Peer', 'Direct Report'][Math.floor(Math.random() * 3)]
  }));
};