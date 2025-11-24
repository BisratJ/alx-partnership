"use client"

import { useState } from 'react';
import { HeroSection } from '@/components/ui/hero-section-dark';
import { NavBar } from '@/components/ui/tubelight-navbar';
import { Home, FileText, Search, LayoutDashboard, BookOpen, CheckCircle2, Clock, Users, Shield, Zap, ArrowRight, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('overview');

  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'Apply', url: '/apply', icon: FileText },
    { name: 'Track', url: '/track', icon: Search },
    { name: 'Docs', url: '/dashboard', icon: LayoutDashboard }
  ];

  const sections = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'features', label: 'Benefits & Levels', icon: Zap },
    { id: 'process', label: 'Partnership Process', icon: Users },
    { id: 'requirements', label: 'Criteria', icon: CheckCircle2 },
    { id: 'security', label: 'Brand Guidelines', icon: Shield },
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
                {/* Overview Section */}
                {activeSection === 'overview' && (
                  <div>
                    <h1 className="text-4xl font-bold text-white mb-4">ALX Partnership Guidelines</h1>
                    <p className="text-xl text-gray-400 mb-8">
                      ALX is dedicated to delivering high-quality, youth-oriented training programs with a strong focus on technology and tech-enabled entrepreneurship, targeting young people aged 18-35.
                    </p>

                    <div className="bg-[#1a1a24] border border-white/10 rounded-lg p-6 mb-8">
                      <h2 className="text-2xl font-semibold text-white mb-4">Introduction</h2>
                      <p className="text-gray-300 mb-4">
                        ALX has been at the forefront of youth empowerment through technology and entrepreneurship for over 4 years, with a mission to transform young people into globally competitive professionals. Through our innovative training programs, bootcamps, and tech hubs, ALX Ethiopia has impacted over 100k youth.
                      </p>
                      <p className="text-gray-300">
                        ALX Ethiopia actively seeks partnerships with organizations that share our mission to create impactful programs and events, enabling us to expand our reach, leverage diverse expertise, and foster innovation within the tech education landscape.
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-white/10 rounded-lg p-6 mb-8">
                      <h2 className="text-2xl font-semibold text-white mb-4">Partnership Goals</h2>
                      <p className="text-gray-300 mb-4">ALX Ethiopia leverages strategic partnerships to:</p>
                      <ul className="space-y-3 text-gray-300">
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <strong className="text-white">Co-create impactful programs:</strong> Collaborate with partners to design and deliver engaging workshops, bootcamps, and conferences that address emerging technological and entrepreneurial skills.
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <strong className="text-white">Expand reach and influence:</strong> Connect with diverse youth communities, broadening access to valuable learning opportunities.
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-pink-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <strong className="text-white">Leverage expertise and resources:</strong> Combine strengths with partners to create richer, more innovative learning experiences.
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <strong className="text-white">Foster sustainable impact:</strong> Establish partnerships that contribute to long-term growth and community empowerment.
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Requirements Section */}
                {activeSection === 'requirements' && (
                  <div>
                    <h1 className="text-4xl font-bold text-white mb-6">Partnership Criteria</h1>
                    <p className="text-xl text-gray-400 mb-8">
                      ALX Ethiopia considers the following criteria when evaluating potential strategic partnerships:
                    </p>

                    <div className="space-y-4">
                      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                          <Users className="w-5 h-5 text-indigo-400" />
                          Target Audience
                        </h3>
                        <p className="text-gray-300 text-sm">
                          Partners must primarily target youth aged 18-34, focusing on empowering and equipping them with essential skills and opportunities.
                        </p>
                      </div>

                      <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-purple-400" />
                          Mission Alignment
                        </h3>
                        <p className="text-gray-300 text-sm">
                          Partners must align with ALX's mission to empower youth through technology, skill-based training, and entrepreneurial development.
                        </p>
                      </div>

                      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                          <Clock className="w-5 h-5 text-green-400" />
                          Operational Track Record
                        </h3>
                        <p className="text-gray-300 text-sm">
                          Partners must demonstrate at least two years of proven experience with a verifiable track record of impact.
                        </p>
                      </div>

                      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                          <Shield className="w-5 h-5 text-yellow-400" />
                          Co-Branding & Recognition
                        </h3>
                        <p className="text-gray-300 text-sm">
                          Partners must commit to co-brand all promotional materials and communications, prominently displaying ALX Ethiopia's logo. Events must be explicitly recognized as collaborations with ALX Ethiopia.
                        </p>
                      </div>

                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-white mb-3">Data Sharing Commitment</h3>
                        <p className="text-gray-300 text-sm">
                          Partners must commit to collaborative data practices, including joint RSVP forms and transparent sharing of attendance and engagement data for impact evaluation.
                        </p>
                      </div>

                      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-white mb-3">Cost Sharing</h3>
                        <p className="text-gray-300 text-sm">
                          While ALX provides venue and equipment (mic, speaker, TV, projector) as in-kind contribution, partners are required to cover additional costs such as catering, promotional materials, and other agreed expenses.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Features Section */}
                {activeSection === 'features' && (
                  <div>
                    <h1 className="text-4xl font-bold text-white mb-6">Partnership Benefits</h1>
                    <p className="text-xl text-gray-400 mb-8">
                      By partnering with ALX Ethiopia, organizations can benefit from the following opportunities:
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-[#1a1a24] border border-white/10 rounded-lg p-6">
                        <Zap className="w-8 h-8 text-indigo-400 mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-3">Enhanced Brand Exposure</h3>
                        <p className="text-gray-300 text-sm">
                          Gain visibility through co-branding on promotional materials, event platforms, and exclusive features on ALX Ethiopia's social media channels, reaching over 100k followers.
                        </p>
                      </div>

                      <div className="bg-[#1a1a24] border border-white/10 rounded-lg p-6">
                        <Users className="w-8 h-8 text-purple-400 mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-3">Exclusive Networking</h3>
                        <p className="text-gray-300 text-sm">
                          Access a vibrant network of industry professionals, thought leaders, and like-minded organizations for collaboration and strategic alliances.
                        </p>
                      </div>

                      <div className="bg-[#1a1a24] border border-white/10 rounded-lg p-6">
                        <Shield className="w-8 h-8 text-green-400 mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-3">Recognition & Credibility</h3>
                        <p className="text-gray-300 text-sm">
                          Be acknowledged as a key contributor to empowering young people and advancing technological education, enhancing your brand's credibility.
                        </p>
                      </div>

                      <div className="bg-[#1a1a24] border border-white/10 rounded-lg p-6">
                        <BookOpen className="w-8 h-8 text-yellow-400 mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-3">Access to ALX Resources</h3>
                        <p className="text-gray-300 text-sm">
                          Benefit from access to ALX's state-of-the-art facilities, expert trainers, and proprietary learning materials. Co-create content and tap into ALX's training expertise.
                        </p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-white/10 rounded-lg p-6">
                      <h2 className="text-2xl font-semibold text-white mb-4">Partnership Levels</h2>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-semibold text-indigo-400 mb-2">Co-Hosted Events</h3>
                          <p className="text-gray-300 text-sm">
                            Collaborate with ALX to plan, execute, and market events, sharing resources and co-branding to directly engage target audiences.
                          </p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-purple-400 mb-2">Content Partnership</h3>
                          <p className="text-gray-300 text-sm">
                            Co-create training modules, workshops, or educational content with ALX, positioning your organization as a thought leader.
                          </p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-pink-400 mb-2">Sponsorship</h3>
                          <p className="text-gray-300 text-sm">
                            Support ALX programs or events financially, gaining brand recognition, priority marketing exposure, and strategic visibility.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Process Section */}
                {activeSection === 'process' && (
                  <div>
                    <h1 className="text-4xl font-bold text-white mb-6">Partnership Process</h1>
                    <p className="text-xl text-gray-400 mb-8">
                      Follow these steps to initiate a partnership with ALX Ethiopia:
                    </p>

                    <div className="space-y-6">
                      <div className="relative pl-8 pb-6 border-l-2 border-indigo-500/30">
                        <div className="absolute left-0 top-0 -translate-x-1/2 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          1
                        </div>
                        <div className="bg-[#1a1a24] border border-white/10 rounded-lg p-6">
                          <h3 className="text-xl font-semibold text-white mb-2">Review Partnership Criteria</h3>
                          <p className="text-gray-300">
                            Reflect on how your program aligns with ALX's mission to empower youth and how this partnership can amplify impact.
                          </p>
                        </div>
                      </div>

                      <div className="relative pl-8 pb-6 border-l-2 border-purple-500/30">
                        <div className="absolute left-0 top-0 -translate-x-1/2 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          2
                        </div>
                        <div className="bg-[#1a1a24] border border-white/10 rounded-lg p-6">
                          <h3 className="text-xl font-semibold text-white mb-2">Create a Concept Note</h3>
                          <p className="text-gray-300">
                            Submit a concise concept note (max 1 page) capturing your program's essence and key outcomes. ALX will provide feedback within 48 hours.
                          </p>
                        </div>
                      </div>

                      <div className="relative pl-8 pb-6 border-l-2 border-pink-500/30">
                        <div className="absolute left-0 top-0 -translate-x-1/2 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          3
                        </div>
                        <div className="bg-[#1a1a24] border border-white/10 rounded-lg p-6">
                          <h3 className="text-xl font-semibold text-white mb-2">Develop Detailed Proposal</h3>
                          <p className="text-gray-300">
                            Prepare a detailed proposal (max 5 pages) covering target audience, objectives, timeline, budget, and resource requirements.
                          </p>
                        </div>
                      </div>

                      <div className="relative pl-8 pb-6 border-l-2 border-green-500/30">
                        <div className="absolute left-0 top-0 -translate-x-1/2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          4
                        </div>
                        <div className="bg-[#1a1a24] border border-white/10 rounded-lg p-6">
                          <h3 className="text-xl font-semibold text-white mb-2">Submit Timeline</h3>
                          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-3">
                            <p className="text-yellow-400 font-semibold flex items-center gap-2">
                              <Clock className="w-5 h-5" />
                              15 Business Days Required
                            </p>
                          </div>
                          <p className="text-gray-300">
                            Submit your concept note and proposal at least 15 business days before the desired event date.
                          </p>
                        </div>
                      </div>

                      <div className="relative pl-8 pb-6 border-l-2 border-blue-500/30">
                        <div className="absolute left-0 top-0 -translate-x-1/2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          5
                        </div>
                        <div className="bg-[#1a1a24] border border-white/10 rounded-lg p-6">
                          <h3 className="text-xl font-semibold text-white mb-2">Proposal Review</h3>
                          <p className="text-gray-300">
                            ALX Ethiopia team will review your proposal and provide feedback within 5 working days to maximize impact.
                          </p>
                        </div>
                      </div>

                      <div className="relative pl-8">
                        <div className="absolute left-0 top-0 -translate-x-1/2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          6
                        </div>
                        <div className="bg-[#1a1a24] border border-white/10 rounded-lg p-6">
                          <h3 className="text-xl font-semibold text-white mb-2">Formalize Partnership (MOU)</h3>
                          <p className="text-gray-300 mb-3">
                            Formalize with an MoU or working document outlining shared goals and responsibilities.
                          </p>
                          <p className="text-gray-400 text-sm">
                            Note: MOU required if partnership involves more than 10 events or ongoing commitments.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Brand Guidelines Section */}
                {activeSection === 'security' && (
                  <div>
                    <h1 className="text-4xl font-bold text-white mb-6">Brand Guidelines & Compliance</h1>
                    <p className="text-xl text-gray-400 mb-8">
                      Partners must adhere to ALX's brand guidelines to ensure consistency and proper representation.
                    </p>

                    <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-white/10 rounded-lg p-6 mb-6">
                      <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                        <Shield className="w-6 h-6 text-indigo-400" />
                        Logo Requirements
                      </h2>
                      <p className="text-gray-300 mb-4">
                        Partners are required to include the ALX logo, as well as logos of affiliated organizations (Mastercard Foundation, Sand Tech), on all marketing materials, event platforms, and relevant promotional activities.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-[#1a1a24] border border-white/10 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-400" />
                          Brand Mentions
                        </h3>
                        <p className="text-gray-300 text-sm">
                          All promotional activities must include references to ALX and affiliated brands where relevant, ensuring appropriate visibility and alignment.
                        </p>
                      </div>

                      <div className="bg-[#1a1a24] border border-white/10 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-purple-400" />
                          Co-Branding Standards
                        </h3>
                        <p className="text-gray-300 text-sm">
                          Events must be explicitly recognized as collaborations with ALX Ethiopia in all communications and promotional materials.
                        </p>
                      </div>
                    </div>

                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-6 mb-8">
                      <h2 className="text-xl font-semibold text-yellow-400 mb-3">Contact Information</h2>
                      <p className="text-gray-300 mb-2">
                        For partnership inquiries or to submit a concept note/proposal:
                      </p>
                      <a href="mailto:ethiopia@alx.app" className="text-indigo-400 hover:text-indigo-300 font-medium">
                        ethiopia@alx.app
                      </a>
                    </div>
                  </div>
                )}

                {/* Other sections can be added here */}
              </div>
            </main>
          </div>

        </div>
      </section>
    </div>
  );
}
