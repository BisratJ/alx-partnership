"use client"

import { HeroSection } from '@/components/ui/hero-section-dark';
import { NavBar } from '@/components/ui/tubelight-navbar';
import { Home, FileText, Search, LayoutDashboard, BookOpen, CheckCircle2, Clock, Users, Shield, Zap, ArrowRight, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'Apply', url: '/apply', icon: FileText },
    { name: 'Track', url: '/track', icon: Search },
    { name: 'Docs', url: '/dashboard', icon: LayoutDashboard }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <NavBar items={navItems} />
      <HeroSection
        title="Welcome to Our Platform"
        subtitle={{
          regular: "Transform your ideas into ",
          gradient: "beautiful digital experiences",
        }}
        description="Transform your ideas into reality with our comprehensive suite of development tools and resources."
        ctaText="Get Started"
        ctaHref="/apply"
        bottomImage={undefined}
        gridOptions={{
          angle: 65,
          opacity: 0.4,
          cellSize: 50,
          lightLineColor: "#4a4a4a",
          darkLineColor: "#2a2a2a",
        }}
        className="pt-20"
      />

      {/* Documentation Viewer Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-4">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <span className="text-sm font-medium text-indigo-400">Documentation</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Everything You Need to Know
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Comprehensive guides and resources for ALX Partnership Management
            </p>
          </div>

          {/* Quick Links Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Getting Started */}
            <Link href="/dashboard" className="group">
              <div className="bg-[#13131a]/50 border border-white/10 rounded-xl p-6 hover:border-indigo-500/30 transition-all hover:bg-[#13131a]/80">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-indigo-500/10 p-3 rounded-lg">
                    <Zap className="w-6 h-6 text-indigo-400" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Getting Started</h3>
                <p className="text-sm text-gray-400">
                  Learn about the ALX Partnership system, features, and capabilities.
                </p>
              </div>
            </Link>

            {/* Partnership Process */}
            <Link href="/dashboard" className="group">
              <div className="bg-[#13131a]/50 border border-white/10 rounded-xl p-6 hover:border-purple-500/30 transition-all hover:bg-[#13131a]/80">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-purple-500/10 p-3 rounded-lg">
                    <Users className="w-6 h-6 text-purple-400" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Partnership Process</h3>
                <p className="text-sm text-gray-400">
                  Step-by-step guide from submission to event execution.
                </p>
              </div>
            </Link>

            {/* Requirements */}
            <Link href="/dashboard" className="group">
              <div className="bg-[#13131a]/50 border border-white/10 rounded-xl p-6 hover:border-green-500/30 transition-all hover:bg-[#13131a]/80">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-green-500/10 p-3 rounded-lg">
                    <CheckCircle2 className="w-6 h-6 text-green-400" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-green-400 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Requirements</h3>
                <p className="text-sm text-gray-400">
                  What you need to submit a successful partnership request.
                </p>
              </div>
            </Link>

            {/* Security */}
            <Link href="/dashboard" className="group">
              <div className="bg-[#13131a]/50 border border-white/10 rounded-xl p-6 hover:border-yellow-500/30 transition-all hover:bg-[#13131a]/80">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-yellow-500/10 p-3 rounded-lg">
                    <Shield className="w-6 h-6 text-yellow-400" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Security & Privacy</h3>
                <p className="text-sm text-gray-400">
                  Enterprise-grade security features and data protection.
                </p>
              </div>
            </Link>

            {/* Timeline */}
            <Link href="/dashboard" className="group">
              <div className="bg-[#13131a]/50 border border-white/10 rounded-xl p-6 hover:border-blue-500/30 transition-all hover:bg-[#13131a]/80">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-blue-500/10 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-blue-400" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Timeline & Deadlines</h3>
                <p className="text-sm text-gray-400">
                  Important dates and the 15-day advance notice requirement.
                </p>
              </div>
            </Link>

            {/* Hub Information */}
            <Link href="/dashboard" className="group">
              <div className="bg-[#13131a]/50 border border-white/10 rounded-xl p-6 hover:border-red-500/30 transition-all hover:bg-[#13131a]/80">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-red-500/10 p-3 rounded-lg">
                    <Calendar className="w-6 h-6 text-red-400" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-red-400 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Hub Information</h3>
                <p className="text-sm text-gray-400">
                  Operating hours, locations, and availability for each hub.
                </p>
              </div>
            </Link>
          </div>

          {/* Key Highlights */}
          <div className="bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-white/10 rounded-2xl p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-500/20 rounded-full mb-4">
                  <Clock className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">15 Days</h3>
                <p className="text-sm text-gray-400">Minimum advance notice required</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-500/20 rounded-full mb-4">
                  <Users className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">3 Hubs</h3>
                <p className="text-sm text-gray-400">CapStone, CityPoint & Virtual</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-pink-500/20 rounded-full mb-4">
                  <CheckCircle2 className="w-6 h-6 text-pink-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">24-48h</h3>
                <p className="text-sm text-gray-400">Review and approval timeline</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
