import React from 'react';
import { Schedule } from './components/Schedule';
import { BreaksDisplay } from './components/BreaksDisplay';
import { COURSES } from './constants';
import { Course } from './types';

const App: React.FC = () => {
  const courses = COURSES as Course[];
  return (
    <div className="bg-slate-900 min-h-screen font-sans text-slate-300 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <Header />
        <main className="mt-6">
          <div className="bg-slate-800 rounded-lg shadow-2xl overflow-hidden border border-slate-700">
            <Schedule courses={courses} />
          </div>
          <BreaksDisplay courses={courses} />
        </main>
      </div>
    </div>
  );
};

const Header: React.FC = () => (
  <header className="bg-slate-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-lg border border-slate-700">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
            <h1 className="text-2xl font-bold text-slate-100">Fall 2025 Schedule Comparison</h1>
            <p className="text-slate-400 mt-1">Eddie vs. Elie (Brother)</p>
        </div>
        <Legend />
    </div>
  </header>
);

const Legend: React.FC = () => (
    <div className="flex items-center space-x-4 text-sm text-slate-300">
        <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded bg-blue-500/30 border border-blue-500"></div>
            <span>Eddie</span>
        </div>
        <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded bg-teal-500/30 border border-teal-500"></div>
            <span>Elie</span>
        </div>
         <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded bg-indigo-500/30 border border-indigo-500"></div>
            <span>Shared</span>
        </div>
    </div>
);


export default App;
