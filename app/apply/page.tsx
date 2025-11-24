'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, Upload, CheckCircle2, Info, Building2, Calendar, Home, FileText, Search, LayoutDashboard } from 'lucide-react';
import { NavBar } from '@/components/ui/tubelight-navbar';
import { MultiStepForm } from '@/components/ui/multi-step-form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const TooltipIcon = ({ text }: { text: string }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
      </TooltipTrigger>
      <TooltipContent>
        <p>{text}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export default function ApplyPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    org_name: '', poc_name: '', poc_email: '', poc_phone: '', org_url: '',
    event_title: '', event_desc: '', partnership_type: '', target_hub: '',
    event_date: '', start_time: '', end_time: '', attendee_count: '',
    mission_align: false, cobranding_consent: false,
  });

  const [files, setFiles] = useState<{ concept?: File; logo?: File }>({});

  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'Apply', url: '/apply', icon: FileText },
    { name: 'Track', url: '/track', icon: Search },
    { name: 'Dashboard', url: '/dashboard', icon: LayoutDashboard }
  ];

  const totalSteps = 3;

  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
    else handleSubmit();
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => formDataToSend.append(key, value.toString()));
      if (files.concept) formDataToSend.append('file_concept', files.concept);
      if (files.logo) formDataToSend.append('file_logo', files.logo);

      const response = await fetch('/api/v1/public/submit', { method: 'POST', body: formDataToSend });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Submission failed');

      alert("Application submitted!\nReference ID: " + data.requestId);
      setFormData({
        org_name: '', poc_name: '', poc_email: '', poc_phone: '', org_url: '',
        event_title: '', event_desc: '', partnership_type: '', target_hub: '',
        event_date: '', start_time: '', end_time: '', attendee_count: '',
        mission_align: false, cobranding_consent: false,
      });
      setFiles({});
      setCurrentStep(1);
      router.push('/');
    } catch (error: any) {
      alert("Error: " + (error.message || "Failed to submit"));
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getStepTitle = () => {
    const titles = ['Partner Information', 'Event Details', 'Documents & Review'];
    return titles[currentStep - 1] || 'Partnership Application';
  };

  const getStepDescription = () => {
    const descriptions = [
      'Tell us about your organization and point of contact.',
      'Provide details about your event and partnership request.',
      'Upload required documents and review your application.'
    ];
    return descriptions[currentStep - 1] || 'Complete the form to submit your partnership request.';
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <NavBar items={navItems} />
      <div className="flex items-center justify-center py-12 pt-28 px-4">
        <MultiStepForm
          currentStep={currentStep}
          totalSteps={totalSteps}
          title={getStepTitle()}
          description={getStepDescription()}
          onBack={handleBack}
          onNext={handleNext}
          nextButtonText={currentStep === totalSteps ? (loading ? 'Submitting...' : 'Submit') : 'Next Step'}
          className="w-full"
        >
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Label htmlFor="org_name">Organization Name *</Label>
                    <TooltipIcon text="Enter your organization official name" />
                  </div>
                  <Input id="org_name" value={formData.org_name} onChange={(e) => updateFormData('org_name', e.target.value)} placeholder="Your organization name" required />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="poc_name">Point of Contact *</Label>
                    <Input id="poc_name" value={formData.poc_name} onChange={(e) => updateFormData('poc_name', e.target.value)} placeholder="Your full name" required />
                  </div>
                  <div>
                    <Label htmlFor="poc_email">Email *</Label>
                    <Input id="poc_email" type="email" value={formData.poc_email} onChange={(e) => updateFormData('poc_email', e.target.value)} placeholder="email@example.com" required />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Label htmlFor="poc_phone">Phone Number *</Label>
                      <TooltipIcon text="Include country code" />
                    </div>
                    <Input id="poc_phone" type="tel" value={formData.poc_phone} onChange={(e) => updateFormData('poc_phone', e.target.value)} placeholder="+254712345678" required />
                  </div>
                  <div>
                    <Label htmlFor="org_url">Website</Label>
                    <Input id="org_url" type="url" value={formData.org_url} onChange={(e) => updateFormData('org_url', e.target.value)} placeholder="https://example.com" />
                  </div>
                </div>
              </div>
              <Alert variant="info">
                <Building2 className="h-4 w-4" />
                <AlertDescription>Ensure all contact information is accurate.</AlertDescription>
              </Alert>
            </div>
          )}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="event_title">Event Title *</Label>
                  <Input id="event_title" value={formData.event_title} onChange={(e) => updateFormData('event_title', e.target.value)} placeholder="Tech Innovation Workshop" required />
                </div>
                <div>
                  <Label htmlFor="event_desc">Description *</Label>
                  <textarea id="event_desc" value={formData.event_desc} onChange={(e) => updateFormData('event_desc', e.target.value)} rows={4} className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" placeholder="Describe your event..." required />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Partnership Type *</Label>
                    <Select value={formData.partnership_type} onValueChange={(value) => updateFormData('partnership_type', value)}>
                      <SelectTrigger><SelectValue placeholder="Select type..." /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SPEAKER">Speaker</SelectItem>
                        <SelectItem value="EVENT">Event</SelectItem>
                        <SelectItem value="RECRUITMENT">Recruitment</SelectItem>
                        <SelectItem value="SPONSORSHIP">Sponsorship</SelectItem>
                        <SelectItem value="OTHER">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Target Hub *</Label>
                    <Select value={formData.target_hub} onValueChange={(value) => updateFormData('target_hub', value)}>
                      <SelectTrigger><SelectValue placeholder="Select hub..." /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CAPSTONE">CapStone</SelectItem>
                        <SelectItem value="CITYPOINT">CityPoint</SelectItem>
                        <SelectItem value="VIRTUAL">Virtual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="event_date">Date *</Label>
                    <Input id="event_date" type="date" value={formData.event_date} onChange={(e) => updateFormData('event_date', e.target.value)} required />
                  </div>
                  <div>
                    <Label htmlFor="start_time">Start *</Label>
                    <Input id="start_time" type="time" value={formData.start_time} onChange={(e) => updateFormData('start_time', e.target.value)} required />
                  </div>
                  <div>
                    <Label htmlFor="end_time">End *</Label>
                    <Input id="end_time" type="time" value={formData.end_time} onChange={(e) => updateFormData('end_time', e.target.value)} required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="attendee_count">Expected Attendees *</Label>
                  <Input id="attendee_count" type="number" value={formData.attendee_count} onChange={(e) => updateFormData('attendee_count', e.target.value)} placeholder="50" min="1" required />
                </div>
              </div>
              <Alert variant="warning">
                <Calendar className="h-4 w-4" />
                <AlertDescription>Events must be 15+ days in advance.</AlertDescription>
              </Alert>
            </div>
          )}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Required Documents</h3>
                <div className="border-2 border-dashed border-border rounded-lg p-6 hover:border-primary transition-colors">
                  <label className="block cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Upload className="w-6 h-6 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="font-medium">Concept Note *</p>
                        <p className="text-sm text-muted-foreground">PDF, max 5MB</p>
                        {files.concept && <p className="text-sm text-green-600 mt-1 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> {files.concept.name}</p>}
                      </div>
                    </div>
                    <input type="file" accept=".pdf" required className="hidden" onChange={(e) => setFiles({ ...files, concept: e.target.files?.[0] })} />
                  </label>
                </div>
                <div className="border-2 border-dashed border-border rounded-lg p-6 hover:border-primary transition-colors">
                  <label className="block cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Upload className="w-6 h-6 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="font-medium">Logo (Optional)</p>
                        <p className="text-sm text-muted-foreground">PNG/JPEG, max 2MB</p>
                        {files.logo && <p className="text-sm text-green-600 mt-1 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> {files.logo.name}</p>}
                      </div>
                    </div>
                    <input type="file" accept="image/png,image/jpeg" className="hidden" onChange={(e) => setFiles({ ...files, logo: e.target.files?.[0] })} />
                  </label>
                </div>
              </div>
              <div className="space-y-3 bg-secondary/50 p-4 rounded-lg">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={formData.mission_align} onChange={(e) => updateFormData('mission_align', e.target.checked)} required className="mt-1 w-4 h-4" />
                  <span className="text-sm">I confirm our organization mission aligns with ALX Africa. *</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={formData.cobranding_consent} onChange={(e) => updateFormData('cobranding_consent', e.target.checked)} required className="mt-1 w-4 h-4" />
                  <span className="text-sm">I agree to ALX co-branding guidelines. *</span>
                </label>
              </div>
              <Alert variant="info">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <p className="font-medium mb-1">Before submitting:</p>
                  <ul className="list-disc ml-5 text-sm">
                    <li>Double-check all information</li>
                    <li>Ensure concept note is attached</li>
                    <li>Review within 48 hours</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </div>
          )}
        </MultiStepForm>
      </div>
    </div>
  );
}
