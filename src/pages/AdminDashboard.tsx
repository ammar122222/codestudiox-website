
import SiteHeader from '@/components/layout/SiteHeader';
// …

(
  <div className="min-h-screen bg-dark-slate text-white">
    <SiteHeader title="Admin Dashboard" />
    {/* rest of dashboard … */}
  </div>
);

import { useDashboardStats } from '@/hooks/useDashboardStats';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAdmin } from '@/contexts/AdminContext';
import { Link } from 'react-router-dom';
import {
  Users,
  FolderOpen,
  Mail,
  BarChart3,
  LogOut,
  Plus,
  Eye,
} from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useMemo } from 'react';
const AdminDashboard = () => {
  const { logout } = useAdmin();
  const { totalProjects, totalSubmissions } = useDashboardStats();

  const stats = useMemo(
    () => [
      {
        title: 'Total Projects',
        value: totalProjects.toString(),
        icon: FolderOpen,
        color: 'text-blue-400',
      },
      {
        title: 'Form Submissions',
        value: totalSubmissions.toString(),
        icon: Mail,
        color: 'text-green-400',
      },
      {
        title: 'Portfolio Views',
        value: '—',
        icon: Eye,
        color: 'text-purple-400',
      },
      {
        title: 'Active Clients',
        value: '—',
        icon: Users,
        color: 'text-orange-400',
      },
    ],
    [totalProjects, totalSubmissions],
  );

  const submissionsData = [
    { month: 'Jan', submissions: 12, clients: 8 },
    { month: 'Feb', submissions: 19, clients: 12 },
    { month: 'Mar', submissions: 15, clients: 10 },
    { month: 'Apr', submissions: 25, clients: 16 },
    { month: 'May', submissions: 22, clients: 14 },
    { month: 'Jun', submissions: 28, clients: 18 },
  ];

  const projectCategoryData = [
    { name: 'Web Development', value: 40, color: '#3b82f6' },
    { name: 'Mobile Apps', value: 25, color: '#10b981' },
    { name: 'E-commerce', value: 20, color: '#8b5cf6' },
    { name: 'UI/UX Design', value: 15, color: '#f59e0b' },
  ];

  const trafficData = [
    { day: 'Mon', views: 120 },
    { day: 'Tue', views: 150 },
    { day: 'Wed', views: 180 },
    { day: 'Thu', views: 200 },
    { day: 'Fri', views: 175 },
    { day: 'Sat', views: 90 },
    { day: 'Sun', views: 110 },
  ];

  const quickActions = [
    { title: 'Add New Project', icon: Plus, link: '/admin/projects', color: 'bg-blue-600' },
    { title: 'View Submissions', icon: Mail, link: '/admin/submissions', color: 'bg-green-600' },
    { title: 'Manage Projects', icon: FolderOpen, link: '/admin/projects', color: 'bg-purple-600' },
    { title: 'View Analytics', icon: BarChart3, link: '/admin/dashboard', color: 'bg-orange-600' },
  ];

  const chartConfig = {
    submissions: { label: 'Submissions', color: '#3b82f6' },
    clients: { label: 'Clients', color: '#10b981' },
    views: { label: 'Views', color: '#8b5cf6' },
  } as const;

  return (
    <div className="min-h-screen bg-dark-slate text-white">
      <header className="bg-slate-800/50 border-b border-electric-blue/20 p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Admin Dashboard</h1>
            <p className="text-gray-400">Welcome back to CodeStudioX</p>
          </div>
          <Button
            onClick={logout}
            variant="outline"
            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          >
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </header>

      <main className="p-6 space-y-8">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="bg-slate-800/50 border-electric-blue/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-slate-800/50 border-electric-blue/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" /> Submissions & Clients Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <LineChart data={submissionsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="submissions" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="clients" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-electric-blue/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <FolderOpen className="w-5 h-5 mr-2" /> Project Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <PieChart>
                  <Pie
                    data={projectCategoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {projectCategoryData.map((entry, idx) => (
                      <Cell key={idx} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {projectCategoryData.map((item, idx) => (
                  <div key={idx} className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-300">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card className="bg-slate-800/50 border-electric-blue/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Eye className="w-5 h-5 mr-2" /> Weekly Portfolio Views
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[250px]">
                <BarChart data={trafficData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="views" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card className="bg-slate-800/50 border-electric-blue/20">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action) => (
                  <Link key={action.title} to={action.link}>
                    <Card className={`bg-slate-700/50 border-slate-600 hover:shadow-lg transition`}> 
                      <CardContent className={`p-4 flex items-center gap-3 ${action.color} text-white rounded-md`}>
                        <action.icon className="w-5 h-5" />
                        <span>{action.title}</span>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
