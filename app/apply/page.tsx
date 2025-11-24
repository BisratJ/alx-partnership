'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, CheckCircle2, Upload, AlertCircle, ArrowLeft } from 'lucide-react';

export default function ApplyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<{
    concept?: File;
    logo?: File;
  }>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      // Add files
      if (files.concept) formData.append('file_concept', files.concept);
      if (files.logo) formData.append('file_logo', files.logo);

      const response = await fetch('/api/v1/public/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Submission failed');
      }

      alert(`✅ Application submitted successfully!\n\nYour reference ID: ${data.requestId}\n\nYou'll receive a confirmation email shortly.`);
      
      // Reset form
      e.currentTarget.reset();
      setFiles({});
      
    } catch (error: any) {
      alert(`❌ ${error.message || 'Failed to submit application'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Back Button */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="bg-[#13131a] rounded-2xl border border-white/5 p-8">
          <h1 className="text-3xl font-bold mb-2 text-white">Partnership Application</h1>
          <p className="text-gray-400 mb-8">
            Complete the form below to submit your partnership request. All fields marked with * are required.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Partner Information */}
            <section>
              <h2 className="text-xl font-semibold mb-4 text-indigo-400">Partner Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">
                    Organization Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="org_name"
                    required
                    maxLength={150}
                    className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder:text-gray-500"
                    placeholder="Your organization name"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Point of Contact Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="poc_name"
                      required
                      maxLength={100}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="poc_email"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="poc_phone"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="+254712345678"
                    />
                    <p className="text-xs text-gray-500 mt-1">Include country code</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Website / Social Media
                    </label>
                    <input
                      type="url"
                      name="org_url"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="https://example.com"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Partnership Criteria */}
            <section>
              <h2 className="text-xl font-semibold mb-4 text-blue-600">Partnership Criteria</h2>
              <div className="space-y-3 bg-blue-50 p-4 rounded-lg">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="mission_align"
                    value="true"
                    required
                    className="mt-1 w-4 h-4"
                  />
                  <span className="text-sm">
                    I confirm that our organization's mission aligns with ALX Africa's goals to empower tech talent in Africa. <span className="text-red-500">*</span>
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="cobranding_consent"
                    value="true"
                    required
                    className="mt-1 w-4 h-4"
                  />
                  <span className="text-sm">
                    I agree to ALX co-branding guidelines for this partnership. <span className="text-red-500">*</span>
                  </span>
                </label>
              </div>
            </section>

            {/* Event Details */}
            <section>
              <h2 className="text-xl font-semibold mb-4 text-blue-600">Event Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Event Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="event_title"
                    required
                    maxLength={100}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Tech Innovation Workshop"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Event Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="event_desc"
                    required
                    maxLength={1000}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe your event, objectives, and expected outcomes..."
                  />
                  <p className="text-xs text-gray-500 mt-1">Maximum 1000 characters</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Partnership Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="partnership_type"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select type...</option>
                      <option value="SPEAKER">Speaker Session</option>
                      <option value="EVENT">Event</option>
                      <option value="RECRUITMENT">Recruitment</option>
                      <option value="SPONSORSHIP">Sponsorship</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Target Hub <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="target_hub"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select hub...</option>
                      <option value="CAPSTONE">CapStone</option>
                      <option value="CITYPOINT">CityPoint</option>
                      <option value="VIRTUAL">Virtual</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Event Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="event_date"
                      required
                      min={new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">Min 15 business days ahead</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Start Time <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="time"
                      name="start_time"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      End Time <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="time"
                      name="end_time"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Expected Attendees <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="attendee_count"
                    required
                    min="1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="50"
                  />
                </div>
              </div>
            </section>

            {/* File Uploads */}
            <section>
              <h2 className="text-xl font-semibold mb-4 text-blue-600">Required Documents</h2>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-400 transition-colors">
                  <label className="block cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Upload className="w-6 h-6 text-gray-400" />
                      <div className="flex-1">
                        <p className="font-medium">
                          Concept Note <span className="text-red-500">*</span>
                        </p>
                        <p className="text-sm text-gray-500">
                          PDF, max 5MB
                        </p>
                        {files.concept && (
                          <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" /> {files.concept.name}
                          </p>
                        )}
                      </div>
                    </div>
                    <input
                      type="file"
                      accept=".pdf"
                      required
                      className="hidden"
                      onChange={(e) => setFiles({ ...files, concept: e.target.files?.[0] })}
                    />
                  </label>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-400 transition-colors">
                  <label className="block cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Upload className="w-6 h-6 text-gray-400" />
                      <div className="flex-1">
                        <p className="font-medium">Logo (Optional)</p>
                        <p className="text-sm text-gray-500">
                          PNG or JPEG, max 2MB
                        </p>
                        {files.logo && (
                          <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" /> {files.logo.name}
                          </p>
                        )}
                      </div>
                    </div>
                    <input
                      type="file"
                      accept="image/png,image/jpeg"
                      className="hidden"
                      onChange={(e) => setFiles({ ...files, logo: e.target.files?.[0] })}
                    />
                  </label>
                </div>
              </div>
            </section>

            {/* Info Banner */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-800">
                <p className="font-medium mb-1">Before you submit:</p>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Ensure your event is scheduled at least 15 business days in advance</li>
                  <li>Hub operating hours are Tuesday-Sunday, 09:00-20:00</li>
                  <li>You'll receive a confirmation email within 1 minute</li>
                  <li>Our team will review your request within 48 hours</li>
                </ul>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </button>
              <Link
                href="/"
                className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
