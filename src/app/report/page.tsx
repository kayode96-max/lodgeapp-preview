'use client';

import { useState } from 'react';
import { AlertTriangle, ArrowLeft, Shield, FileText, Send, Camera, Phone } from 'lucide-react';
import Link from 'next/link';

interface ReportData {
  reportType: string;
  description: string;
  landlordName: string;
  phoneNumber: string;
  location: string;
  amountInvolved: string;
  evidence: FileList | null;
  isAnonymous: boolean;
  reporterContact: string;
}

export default function ReportPage() {
  const [formData, setFormData] = useState<ReportData>({
    reportType: '',
    description: '',
    landlordName: '',
    phoneNumber: '',
    location: '',
    amountInvolved: '',
    evidence: null,
    isAnonymous: true,
    reporterContact: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const reportTypes = [
    'Fake Property Listing',
    'Overcharging/Hidden Fees',
    'No Receipt/Documentation',
    'Unsafe Living Conditions',
    'Harassment by Landlord',
    'Discrimination',
    'Identity Theft/Fraud',
    'Other Scam'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call - replace with actual Firestore submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would submit to Firestore with proper security measures
      console.log('Submitting report:', formData);
      
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting report:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof ReportData, value: string | boolean | FileList | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen">
        {/* Header */}
        <header className="bg-black/20 backdrop-blur-sm border-b border-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16">
              <Link href="/" className="flex items-center gap-3 text-white hover:text-purple-300 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back to Home</span>
              </Link>
            </div>
          </div>
        </header>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-green-900/20 border border-green-700/30 rounded-xl p-8 text-center">
            <Shield className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-4">Report Submitted Successfully</h1>
            <p className="text-gray-300 mb-6">
              Thank you for helping keep the FUTMinna student community safe. Your report has been submitted 
              and will be reviewed by our security team within 24 hours.
            </p>
            <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4 mb-6">
              <p className="text-blue-200 text-sm">
                <strong>What happens next:</strong><br />
                • Your report is encrypted and stored securely<br />
                • Our team will investigate within 24-48 hours<br />
                • If urgent, we will contact authorities immediately<br />
                • You&apos;ll receive updates if contact info was provided
              </p>
            </div>
            <Link 
              href="/" 
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-3 text-white hover:text-purple-300 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Home</span>
            </Link>
            
            <div className="flex items-center gap-2 text-red-400">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-medium">Report Scam</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-red-600 p-2 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Report Suspicious Activity</h1>
                  <p className="text-gray-400">Help protect the FUTMinna student community</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Report Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Type of Issue *
                  </label>
                  <select
                    required
                    value={formData.reportType}
                    onChange={(e) => handleInputChange('reportType', e.target.value)}
                    className="w-full px-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Select issue type</option>
                    {reportTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Detailed Description *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Provide as much detail as possible about the incident, including dates, times, and specific actions taken by the scammer..."
                    className="w-full px-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                {/* Suspect Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Landlord/Suspect Name
                    </label>
                    <input
                      type="text"
                      value={formData.landlordName}
                      onChange={(e) => handleInputChange('landlordName', e.target.value)}
                      placeholder="If known"
                      className="w-full px-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                      placeholder="Suspect's phone number"
                      className="w-full px-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Location/Property Address
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="Where did this incident occur?"
                    className="w-full px-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                {/* Amount Involved */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Amount Involved (₦)
                  </label>
                  <input
                    type="number"
                    value={formData.amountInvolved}
                    onChange={(e) => handleInputChange('amountInvolved', e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                {/* Evidence Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Evidence (Screenshots, Photos, Documents)
                  </label>
                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-6">
                    <div className="text-center">
                      <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-400 mb-2">Upload supporting evidence</p>
                      <input
                        type="file"
                        multiple
                        accept="image/*,.pdf,.doc,.docx"
                        onChange={(e) => handleInputChange('evidence', e.target.files)}
                        className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                      />
                    </div>
                  </div>
                </div>

                {/* Anonymous Reporting */}
                <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <input
                      type="checkbox"
                      id="anonymous"
                      checked={formData.isAnonymous}
                      onChange={(e) => handleInputChange('isAnonymous', e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="anonymous" className="text-blue-200 font-medium">
                      Submit Anonymously
                    </label>
                  </div>
                  <p className="text-blue-200 text-sm">
                    Your identity will be protected. We recommend anonymous reporting for safety.
                  </p>
                </div>

                {/* Contact Information (if not anonymous) */}
                {!formData.isAnonymous && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Your Contact Information (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.reporterContact}
                      onChange={(e) => handleInputChange('reporterContact', e.target.value)}
                      placeholder="Phone or email for follow-up"
                      className="w-full px-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.reportType || !formData.description}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting Report...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Submit Report
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Emergency Contacts */}
            <div className="bg-red-900/20 border border-red-700/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5 text-red-400" />
                Emergency Contacts
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="font-medium text-white">FUTMinna Security</div>
                  <div className="text-red-200 text-sm">090-3456-7890</div>
                </div>
                <div>
                  <div className="font-medium text-white">Minna Police</div>
                  <div className="text-red-200 text-sm">199</div>
                </div>
                <div>
                  <div className="font-medium text-white">Student Affairs</div>
                  <div className="text-red-200 text-sm">090-1234-5678</div>
                </div>
              </div>
            </div>

            {/* Safety Tips */}
            <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-yellow-400" />
                Safety Tips
              </h3>
              <ul className="text-yellow-200 text-sm space-y-2">
                <li>• Never pay rent without seeing the property</li>
                <li>• Always request and keep receipts</li>
                <li>• Verify landlord identity with multiple contacts</li>
                <li>• Be suspicious of unusually low prices</li>
                <li>• Meet landlords in public places first</li>
                <li>• Trust your instincts - report suspicious behavior</li>
              </ul>
            </div>

            {/* Report Statistics */}
            <div className="bg-purple-900/20 border border-purple-700/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-400" />
                Community Impact
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">Reports This Month</span>
                  <span className="text-white font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Scams Prevented</span>
                  <span className="text-green-400 font-medium">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Money Saved</span>
                  <span className="text-green-400 font-medium">₦450,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
