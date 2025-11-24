import Link from 'next/link';
import { Building2, Calendar, Bell, Shield, Users, FileCheck, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <nav className="border-b border-white/20 bg-white/70 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Building2 className="h-8 w-8 text-indigo-600 group-hover:text-indigo-700 transition-all duration-300 group-hover:scale-110" />
              <div className="absolute -inset-1 bg-indigo-200 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              ALX Partnership
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/track" className="px-4 py-2 text-gray-700 hover:text-indigo-600 transition-all duration-300 font-medium relative group">
              <span>Track</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/apply" className="px-4 py-2 text-gray-700 hover:text-indigo-600 transition-all duration-300 font-medium relative group">
              <span>Apply</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/dashboard">
              <button className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2">
                Dashboard
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-indigo-100 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer">
            <Sparkles className="w-4 h-4 text-indigo-600 group-hover:rotate-12 transition-transform" />
            <span className="text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Streamlined Partnership Process
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-extrabold leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">
              Partner with
            </span>
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
              ALX Africa
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Submit partnership requests, track your application status in real-time, 
            and collaborate with our team through our <span className="font-semibold text-indigo-600">streamlined portal</span>.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/apply">
              <button className="group px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3 relative overflow-hidden">
                <span className="relative z-10">Apply for Partnership</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </Link>
            <Link href="/track">
              <button className="group px-10 py-5 bg-white/80 backdrop-blur-sm border-2 border-indigo-200 text-indigo-700 rounded-2xl font-bold text-lg hover:bg-white hover:border-indigo-300 hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-3">
                Track Application
                <CheckCircle2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 pt-12 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>Instant Confirmation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>Real-time Tracking</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>48-Hour Response</span>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-32 grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          <FeatureCard
            icon={<FileCheck className="h-10 w-10" />}
            title="Easy Application"
            description="Submit your partnership request with our simple, guided form. Automatic validation ensures completeness."
            gradient="from-blue-500 to-cyan-500"
          />
          <FeatureCard
            icon={<Calendar className="h-10 w-10" />}
            title="Smart Scheduling"
            description="Our system automatically checks hub availability and prevents conflicts. Real-time calendar integration included."
            gradient="from-purple-500 to-pink-500"
          />
          <FeatureCard
            icon={<Bell className="h-10 w-10" />}
            title="Instant Updates"
            description="Get notified immediately when your request status changes. Track everything from submission to approval."
            gradient="from-amber-500 to-orange-500"
          />
          <FeatureCard
            icon={<Shield className="h-10 w-10" />}
            title="Secure & Compliant"
            description="Enterprise-grade security with role-based access control. Your data is encrypted and protected."
            gradient="from-green-500 to-emerald-500"
          />
          <FeatureCard
            icon={<Users className="h-10 w-10" />}
            title="Team Collaboration"
            description="Multiple team members can manage requests. Assign tasks and track progress together."
            gradient="from-indigo-500 to-purple-500"
          />
          <FeatureCard
            icon={<Building2 className="h-10 w-10" />}
            title="Multi-Hub Support"
            description="Manage partnerships across all ALX hubs - CapStone, CityPoint, and Virtual events."
            gradient="from-rose-500 to-red-500"
          />
        </div>

        {/* Stats */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <StatCard number="500+" label="Partnerships" />
          <StatCard number="3" label="Hub Locations" />
          <StatCard number="24/7" label="Support" />
          <StatCard number="100%" label="Transparency" />
        </div>

        {/* CTA Section */}
        <div className="relative mt-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl transform -skew-y-1"></div>
          <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-16 text-center text-white shadow-2xl">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-20 -translate-y-20 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full translate-x-20 translate-y-20 blur-3xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                Ready to Partner with ALX?
              </h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                Join hundreds of organizations collaborating with ALX to empower the next generation of tech talent in Africa.
              </p>
              <Link href="/apply">
                <button className="group px-10 py-5 bg-white text-indigo-700 font-bold text-lg rounded-2xl hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl inline-flex items-center gap-3">
                  Start Your Application
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-gray-50 mt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">ALX Partnership</h3>
              <p className="text-sm text-gray-600">
                Streamlining collaboration with partners across Africa.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/apply" className="hover:text-blue-600">Apply</Link></li>
                <li><Link href="/track" className="hover:text-blue-600">Track Request</Link></li>
                <li><Link href="/dashboard" className="hover:text-blue-600">Staff Login</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="mailto:partnerships@alxafrica.com" className="hover:text-blue-600">Email Us</a></li>
                <li><Link href="/faq" className="hover:text-blue-600">FAQ</Link></li>
                <li><Link href="/guidelines" className="hover:text-blue-600">Guidelines</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/privacy" className="hover:text-blue-600">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-blue-600">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2025 ALX Africa. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, gradient }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  gradient: string;
}) {
  return (
    <div className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent hover:-translate-y-2 overflow-hidden">
      {/* Gradient Background on Hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
      
      {/* Icon with Gradient */}
      <div className={`relative mb-6 inline-flex p-4 rounded-2xl bg-gradient-to-br ${gradient} text-white transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
        {icon}
      </div>
      
      <h3 className="relative text-xl font-bold mb-3 text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-300">
        {title}
      </h3>
      <p className="relative text-gray-600 leading-relaxed">
        {description}
      </p>
      
      {/* Bottom Accent */}
      <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${gradient} group-hover:w-full transition-all duration-500`}></div>
    </div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="group text-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-indigo-100 hover:border-indigo-300 hover:bg-white hover:shadow-xl transition-all duration-300 cursor-pointer">
      <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform inline-block">
        {number}
      </div>
      <div className="text-gray-600 mt-2 font-medium group-hover:text-indigo-600 transition-colors">
        {label}
      </div>
    </div>
  );
}
