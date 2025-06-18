
import { Link } from 'react-router-dom';
import { CheckSquare, Plus, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <CheckSquare className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to <span className="text-blue-600">TaskFlow</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A beautiful and intuitive task management application built with React. 
            Organize your tasks, track progress, and boost your productivity.
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="text-lg px-8 py-3">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <Plus className="h-12 w-12 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Add Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Quickly add new tasks with our intuitive form interface. 
                Keep your thoughts organized and never miss a deadline.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <Edit className="h-12 w-12 text-green-600" />
              </div>
              <CardTitle className="text-xl">Manage Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Edit, complete, or delete tasks with ease. 
                Full CRUD operations to keep your task list perfectly organized.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <CheckSquare className="h-12 w-12 text-purple-600" />
              </div>
              <CardTitle className="text-xl">Track Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Filter tasks by status, search through your list, 
                and track your productivity with detailed statistics.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tech Stack */}
        <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Built with Modern Technologies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <span className="px-3 py-1 bg-blue-100 rounded-full">React 18</span>
              <span className="px-3 py-1 bg-blue-100 rounded-full">TypeScript</span>
              <span className="px-3 py-1 bg-blue-100 rounded-full">React Router</span>
              <span className="px-3 py-1 bg-blue-100 rounded-full">Custom Hooks</span>
              <span className="px-3 py-1 bg-blue-100 rounded-full">Tailwind CSS</span>
              <span className="px-3 py-1 bg-blue-100 rounded-full">DummyJSON API</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
