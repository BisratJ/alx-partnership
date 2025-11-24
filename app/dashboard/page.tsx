'use client';

import { useState } from 'react';
import { Home, FileText, Search, LayoutDashboard, BookOpen, CheckCircle2, Users, Shield, Zap, Clock, ChevronRight } from 'lucide-react';
import { NavBar } from '@/components/ui/tubelight-navbar';

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState('overview');

  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'Apply', url: '/apply', icon: FileText },
    { name: 'Track', url: '/track', icon: Search },
    { name: 'Docs', url: '/dashboard', icon: LayoutDashboard }
  ];

  const sections = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'features', label: 'Key Features', icon: Zap },
    { id: 'process', label: 'Partnership Process', icon: Users },
    { id: 'requirements', label: 'Requirements', icon: CheckCircle2 },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <NavBar items={navItems} />
      <div className="pt-28 pb-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex gap-8">
            {/* Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-28 bg-[#13131a]/50 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Documentation</h3>
                <nav className="space-y-1">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          activeSection === section.id
                            ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {section.label}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0">
              <div className="bg-[#13131a]/50 border border-white/10 rounded-xl backdrop-blur-sm p-8">
                <div className="prose prose-invert max-w-none">
                  <h1 className="text-4xl font-bold text-white mb-4">ALX Partnership Documentation</h1>
                  <p className="text-xl text-gray-400 mb-8">
                    Welcome to the ALX Partnership Management System - A production-ready platform for managing partnerships.
                  </p>

                  {activeSection === 'overview' && (
                    <div>
                      <div className="grid md:grid-cols-2 gap-6 my-8">
                        <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-6">
                          <Users className="w-8 h-8 text-indigo-400 mb-4" />
                          <h3 className="text-lg font-semibold text-white mb-2">For Partners</h3>
                          <p className="text-gray-400 text-sm">Submit requests, track status, collaborate with ALX hubs.</p>
                        </div>
                        <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-6">
                          <Shield className="w-8 h-8 text-purple-400 mb-4" />
                          <h3 className="text-lg font-semibold text-white mb-2">For ALX Team</h3>
                          <p className="text-gray-400 text-sm">Manage requests, schedule events, maintain audit trails.</p>
                        </div>
                      </div>

                      <div className="bg-[#1a1a24] border border-white/10 rounded-lg p-6 my-6">
                        <h3 className="text-lg font-semibold text-white mb-3">Key Capabilities</h3>
                        <ul className="space-y-2 text-gray-300">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                            <span>Automated intake with validation and file uploads</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                            <span>Smart calendar scheduling with conflict detection</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                            <span>Role-based access control for team collaboration</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {activeSection === 'requirements' && (
                    <div>
                      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-6 mb-8">
                        <div className="flex gap-3">
                          <Clock className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <h3 className="text-lg font-semibold text-yellow-400 mb-2">15-Day Advance Notice</h3>
                            <p className="text-gray-300 text-sm">
                              All requests must be submitted at least 15 business days before the event date.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-[#1a1a24] border border-white/10 rounded-lg p-5">
                          <h3 className="text-lg font-semibold text-white mb-3">Required Documents</h3>
                          <ul className="space-y-2 text-gray-300 text-sm">
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5" />
                              <span><strong>Concept Note</strong>: PDF format, max 5MB</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5" />
                              <span><strong>Logo (Optional)</strong>: PNG/JPEG, max 2MB</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSection === 'security' && (
                    <div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-[#1a1a24] border border-white/10 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-white mb-3">Encryption</h3>
                          <ul className="space-y-2 text-sm text-gray-300">
                            <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5" />TLS 1.3 encryption</li>
                            <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5" />AES-256 at rest</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
