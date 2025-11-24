import Link from 'next/link';
import { Building2, Calendar, Bell, Shield, Users, FileCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { HeroSection } from '@/components/ui/hero-section-dark';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Hero Section with Retro Grid */}
      <HeroSection
        title="Welcome to Our Platform"
        subtitle={{
          regular: "Transform your ideas into ",
          gradient: "beautiful digital experiences",
        }}
        description="Transform your ideas into reality with our comprehensive suite of development tools and resources."
        ctaText="Get Started"
        ctaHref="/apply"
        gridOptions={{
          angle: 65,
          opacity: 0.4,
          cellSize: 50,
          lightLineColor: "#4a4a4a",
          darkLineColor: "#2a2a2a",
        }}
      />

      {/* Features Grid */}
      <div className="relative container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold mb-4 text-white">
            Why Partner with ALX?
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Join hundreds of organizations empowering the next generation of tech talent in Africa
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
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
      </div>

      {/* Stats */}
      <div className="relative container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <StatCard number="500+" label="Partnerships" />
          <StatCard number="3" label="Hub Locations" />
          <StatCard number="24/7" label="Support" />
          <StatCard number="100%" label="Transparency" />
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative container mx-auto px-4 py-24">
        <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-pink-600/10 border border-white/10 rounded-2xl p-16 text-center">
          <div className="absolute top-0 left-0 w-40 h-40 bg-indigo-500/20 rounded-full -translate-x-20 -translate-y-20 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500/20 rounded-full translate-x-20 translate-y-20 blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-white">
              Ready to Partner with ALX?
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join hundreds of organizations collaborating with ALX to empower the next generation of tech talent in Africa.
            </p>
            <Link href="/apply">
              <button className="group px-10 py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-3">
                Start Your Application
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-black/30 mt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4 text-white">ALX Partnership</h3>
              <p className="text-sm text-gray-400">
                Streamlining collaboration with partners across Africa.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/apply" className="hover:text-indigo-400 transition-colors">Apply</Link></li>
                <li><Link href="/track" className="hover:text-indigo-400 transition-colors">Track Request</Link></li>
                <li><Link href="/dashboard" className="hover:text-indigo-400 transition-colors">Staff Login</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="mailto:partnerships@alxafrica.com" className="hover:text-indigo-400 transition-colors">Email Us</a></li>
                <li><Link href="/faq" className="hover:text-indigo-400 transition-colors">FAQ</Link></li>
                <li><Link href="/guidelines" className="hover:text-indigo-400 transition-colors">Guidelines</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/privacy" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-indigo-400 transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 mt-8 pt-8 text-center text-sm text-gray-500">
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
    <div className="group relative bg-[#13131a] p-8 rounded-xl border border-white/5 hover:border-white/10 transition-all duration-500 hover:-translate-y-1 overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
      <div className={`relative mb-6 inline-flex p-4 rounded-xl bg-gradient-to-br ${gradient} text-white transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
        {icon}
      </div>
      <h3 className="relative text-xl font-bold mb-3 text-white transition-all duration-300">
        {title}
      </h3>
      <p className="relative text-gray-400 leading-relaxed">
        {description}
      </p>
      <div className={`absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r ${gradient} group-hover:w-full transition-all duration-500`}></div>
    </div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="group text-center p-6 rounded-xl bg-[#13131a]/50 backdrop-blur-sm border border-white/5 hover:border-indigo-500/30 hover:bg-[#13131a] transition-all duration-300 cursor-pointer">
      <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform inline-block">
        {number}
      </div>
      <div className="text-gray-400 mt-2 font-medium group-hover:text-gray-300 transition-colors">
        {label}
      </div>
    </div>
  );
}
