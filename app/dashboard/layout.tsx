import React from 'react';
import Navbar from '@/components/Navbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
} 