import Link from 'next/link';
import { Building2, Calendar, Bell, Shield, Users, FileCheck } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">ALX Partnership</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/track" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Track
            </Link>
            <Link href="/apply" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Apply
            </Link>
            <Link href="/dashboard">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Dashboard
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Partner with <span className="text-blue-600">ALX Africa</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Submit partnership requests, track your application status, and collaborate 
            with our team through our streamlined portal.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link href="/apply">
              <button className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg">
                Apply for Partnership
              </button>
            </Link>
            <Link href="/track">
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Track Application
              </button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-24 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <FeatureCard
            icon={<FileCheck className="h-8 w-8 text-blue-600" />}
            title="Easy Application"
            description="Submit your partnership request with our simple, guided form. Automatic validation ensures completeness."
          />
          <FeatureCard
            icon={<Calendar className="h-8 w-8 text-blue-600" />}
            title="Smart Scheduling"
            description="Automated conflict detection prevents double-bookings. Get instant feedback on availability."
          />
          <FeatureCard
            icon={<Bell className="h-8 w-8 text-blue-600" />}
            title="Real-time Updates"
            description="Receive email notifications at every step of the review process. Stay informed automatically."
          />
          <FeatureCard
            icon={<Shield className="h-8 w-8 text-blue-600" />}
            title="Secure & Compliant"
            description="Your data is encrypted and protected. Full audit trail for transparency and accountability."
          />
          <FeatureCard
            icon={<Users className="h-8 w-8 text-blue-600" />}
            title="Team Collaboration"
            description="Internal teams can review, comment, and assign requests seamlessly across departments."
          />
          <FeatureCard
            icon={<Building2 className="h-8 w-8 text-blue-600" />}
            title="Hub Management"
            description="Manage events across multiple locations: CapStone, CityPoint, and virtual spaces."
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
        <div className="mt-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Partner with ALX?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of organizations collaborating with ALX to empower the next generation of tech talent in Africa.
          </p>
          <Link 
            href="/apply"
            className="inline-block px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all transform hover:scale-105"
          >
            Start Your Application
          </Link>
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

function FeatureCard({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-100">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-blue-600">{number}</div>
      <div className="text-gray-600 mt-1">{label}</div>
    </div>
  );
}
