'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, CheckCircle2, Clock, XCircle, Calendar, Building2, Users, MapPin, ArrowLeft, Home, FileText, LayoutDashboard } from 'lucide-react';
import { NavBar } from '@/components/ui/tubelight-navbar';

interface RequestDetails {
  id: string;
  eventTitle: string;
  eventDesc: string;
  status: string;
  partnershipType: string;
  requestedDate: string;
  startTime: string;
  endTime: string;
  attendeeCount: number;
  submittedAt: string;
  partner: {
    orgName: string;
    pocEmail: string;
    pocPhone: string;
  };
  hub: {
    name: string;
  };
}

export default function TrackPage() {
  const [requestId, setRequestId] = useState('');
  const [loading, setLoading] = useState(false);
  const [request, setRequest] = useState<RequestDetails | null>(null);
  const [error, setError] = useState('');

  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'Apply', url: '/apply', icon: FileText },
    { name: 'Track', url: '/track', icon: Search },
    { name: 'Docs', url: '/dashboard', icon: LayoutDashboard }
  ];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestId.trim()) return;

    setLoading(true);
    setError('');
    setRequest(null);

    try {
      const response = await fetch(`/api/v1/requests/${requestId}`);
      
      if (!response.ok) {
        throw new Error('Request not found. Please check your reference ID.');
      }

      const data = await response.json();
      setRequest(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'NEW':
        return <Clock className="w-6 h-6 text-blue-500" />;
      case 'UNDER_REVIEW':
        return <Clock className="w-6 h-6 text-yellow-500" />;
      case 'APPROVED':
        return <CheckCircle2 className="w-6 h-6 text-green-500" />;
      case 'REJECTED':
        return <XCircle className="w-6 h-6 text-red-500" />;
      case 'SCHEDULED':
        return <Calendar className="w-6 h-6 text-purple-500" />;
      default:
        return <Clock className="w-6 h-6 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      NEW: 'bg-blue-950/30 text-blue-300 border-blue-500/30',
      UNDER_REVIEW: 'bg-yellow-950/30 text-yellow-300 border-yellow-500/30',
      APPROVED: 'bg-green-950/30 text-green-300 border-green-500/30',
      REJECTED: 'bg-red-950/30 text-red-300 border-red-500/30',
      SCHEDULED: 'bg-purple-950/30 text-purple-300 border-purple-500/30',
      COMPLETED: 'bg-gray-950/30 text-gray-300 border-gray-500/30',
    };
    return colors[status] || 'bg-gray-950/30 text-gray-300 border-gray-500/30';
  };

  const getStatusMessage = (status: string) => {
    const messages: Record<string, string> = {
      NEW: 'Your request has been received and is in our queue for review.',
      UNDER_REVIEW: 'Our team is currently reviewing your partnership request.',
      APPROVED: 'Congratulations! Your partnership request has been approved.',
      REJECTED: 'Unfortunately, we cannot proceed with this partnership request at this time.',
      SCHEDULED: 'Your event has been scheduled! Check your email for details.',
      COMPLETED: 'This partnership event has been completed successfully.',
    };
    return messages[status] || 'Status update pending.';
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <NavBar items={navItems} />
      <div className="py-12 pt-28">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="bg-[#13131a] rounded-2xl border border-white/5 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 text-white">Track Your Application</h1>
            <p className="text-gray-400">
              Enter your reference ID to check the status of your partnership request
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={requestId}
                  onChange={(e) => setRequestId(e.target.value)}
                  placeholder="Enter your reference ID (e.g., abc123...)"
                  className="w-full pl-12 pr-4 py-3 bg-black/30 border-2 border-white/10 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder:text-gray-500"
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                disabled={loading || !requestId.trim()}
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
              >
                {loading ? 'Searching...' : 'Track'}
              </button>
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Your reference ID was sent to your email after submission
            </p>
          </form>

          {/* Error Message */}
          {error && (
            <div className="bg-red-950/20 border border-red-500/20 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-red-400">Request Not Found</p>
                  <p className="text-sm text-red-300 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Request Details */}
          {request && (
            <div className="space-y-6">
              {/* Status Card */}
              <div className={`border-2 rounded-xl p-6 ${getStatusColor(request.status)}`}>
                <div className="flex items-start gap-4">
                  {getStatusIcon(request.status)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold">Status: {request.status.replace('_', ' ')}</h3>
                      <span className="text-sm font-medium">
                        Ref: {request.id.substring(0, 8)}...
                      </span>
                    </div>
                    <p className="text-sm opacity-90">{getStatusMessage(request.status)}</p>
                  </div>
                </div>
              </div>

              {/* Event Details */}
              <div className="border rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  Event Details
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Event Title</p>
                    <p className="font-semibold text-lg">{request.eventTitle}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Description</p>
                    <p className="text-gray-900">{request.eventDesc}</p>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 pt-3">
                    <div>
                      <p className="text-sm text-gray-600">Date</p>
                      <p className="font-medium">
                        {new Date(request.requestedDate).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Time</p>
                      <p className="font-medium">{request.startTime} - {request.endTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Expected Attendees</p>
                      <p className="font-medium flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {request.attendeeCount}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Organization & Location */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    Organization
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="font-medium">{request.partner.orgName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Contact Email</p>
                      <p className="font-medium">{request.partner.pocEmail}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium">{request.partner.pocPhone}</p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    Location & Type
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-gray-600">Hub</p>
                      <p className="font-medium">{request.hub.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Partnership Type</p>
                      <p className="font-medium">{request.partnershipType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Submitted</p>
                      <p className="font-medium">
                        {new Date(request.submittedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="border rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4">Timeline</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Request Submitted</p>
                      <p className="text-sm text-gray-600">
                        {new Date(request.submittedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {['UNDER_REVIEW', 'APPROVED', 'SCHEDULED'].includes(request.status) && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Under Review</p>
                        <p className="text-sm text-gray-600">Being reviewed by our team</p>
                      </div>
                    </div>
                  )}

                  {['APPROVED', 'SCHEDULED'].includes(request.status) && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Approved</p>
                        <p className="text-sm text-gray-600">Your request has been approved</p>
                      </div>
                    </div>
                  )}

                  {request.status === 'SCHEDULED' && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium">Scheduled</p>
                        <p className="text-sm text-gray-600">Event has been scheduled</p>
                      </div>
                    </div>
                  )}

                  {request.status === 'REJECTED' && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                        <XCircle className="w-4 h-4 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium">Not Approved</p>
                        <p className="text-sm text-gray-600">
                          Unable to proceed at this time
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setRequest(null);
                    setRequestId('');
                  }}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                >
                  Track Another Request
                </button>
                <Link
                  href="mailto:partnerships@alxafrica.com"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-semibold"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          )}

          {/* Help Text */}
          {!request && !error && (
            <div className="text-center text-gray-500 mt-8">
              <p className="text-sm">
                Can't find your reference ID? Check your email for the confirmation message,
                or <Link href="mailto:partnerships@alxafrica.com" className="text-blue-600 hover:underline">contact us</Link> for assistance.
              </p>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
