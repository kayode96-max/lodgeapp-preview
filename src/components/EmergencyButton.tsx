'use client';

import { useState } from 'react';
import { Phone, Shield, MapPin, Clock, AlertTriangle, X } from 'lucide-react';

interface EmergencyContact {
  name: string;
  number: string;
  description: string;
  category: 'security' | 'medical' | 'police' | 'fire';
}

const emergencyContacts: EmergencyContact[] = [
  {
    name: 'FUTMinna Security',
    number: '090-3456-7890',
    description: 'Campus security and student safety',
    category: 'security'
  },
  {
    name: 'Minna Police Station',
    number: '199',
    description: 'Emergency police services',
    category: 'police'
  },
  {
    name: 'Niger State Fire Service',
    number: '190',
    description: 'Fire emergency services',
    category: 'fire'
  },
  {
    name: 'General Hospital Minna',
    number: '066-222-334',
    description: 'Medical emergency services',
    category: 'medical'
  },
  {
    name: 'Student Affairs Office',
    number: '090-1234-5678',
    description: 'Student welfare and accommodation issues',
    category: 'security'
  },
];

const categoryColors = {
  security: 'bg-blue-600 hover:bg-blue-700',
  medical: 'bg-red-600 hover:bg-red-700',
  police: 'bg-indigo-600 hover:bg-indigo-700',
  fire: 'bg-orange-600 hover:bg-orange-700',
};

const categoryIcons = {
  security: Shield,
  medical: Phone,
  police: Shield,
  fire: AlertTriangle,
};

interface EmergencyButtonProps {
  className?: string;
}

export default function EmergencyButton({ className = '' }: EmergencyButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCall = (number: string, name: string) => {
    // In a real app, this would initiate a phone call
    window.open(`tel:${number}`);
    
    // Log the emergency call for analytics
    console.log(`Emergency call initiated to ${name} at ${number}`);
  };

  return (
    <>
      {/* Emergency Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40 animate-pulse ${className}`}
        aria-label="Emergency Contacts"
      >
        <Phone className="w-6 h-6" />
      </button>

      {/* Emergency Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl max-w-md w-full max-h-[80vh] overflow-hidden">
            {/* Header */}
            <div className="bg-red-600 p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-white" />
                <div>
                  <h2 className="text-lg font-bold text-white">Emergency Contacts</h2>
                  <p className="text-red-100 text-sm">FUTMinna Student Safety</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-red-200 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 max-h-96 overflow-y-auto">
              {/* Quick Actions */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-3">
                  Quick Emergency
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleCall('199', 'Police')}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <Shield className="w-4 h-4" />
                    Police (199)
                  </button>
                  <button
                    onClick={() => handleCall('090-3456-7890', 'FUTMinna Security')}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <Shield className="w-4 h-4" />
                    Campus Security
                  </button>
                </div>
              </div>

              {/* All Contacts */}
              <div>
                <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-3">
                  All Emergency Contacts
                </h3>
                <div className="space-y-3">
                  {emergencyContacts.map((contact, index) => {
                    const IconComponent = categoryIcons[contact.category];
                    return (
                      <div
                        key={index}
                        className="bg-gray-800/50 border border-gray-700 rounded-lg p-4"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <IconComponent className="w-4 h-4 text-gray-400" />
                            <span className="font-medium text-white">{contact.name}</span>
                          </div>
                          <button
                            onClick={() => handleCall(contact.number, contact.name)}
                            className={`${categoryColors[contact.category]} text-white px-3 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1`}
                          >
                            <Phone className="w-3 h-3" />
                            Call
                          </button>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">{contact.description}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Phone className="w-3 h-3" />
                          <span>{contact.number}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Safety Tips */}
              <div className="mt-6 bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-4">
                <div className="flex items-center gap-2 text-yellow-400 mb-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="font-medium text-sm">Safety Tips</span>
                </div>
                <ul className="text-xs text-yellow-200 space-y-1">
                  <li>• Share your location with trusted contacts</li>
                  <li>• Keep emergency numbers saved in your phone</li>
                  <li>• Report suspicious activities immediately</li>
                  <li>• Travel in groups, especially at night</li>
                  <li>• Keep your accommodation details updated</li>
                </ul>
              </div>

              {/* Location Info */}
              <div className="mt-4 bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
                <div className="flex items-center gap-2 text-blue-400 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="font-medium text-sm">Your Safety Zone</span>
                </div>
                <p className="text-xs text-blue-200">
                  You are in the FUTMinna campus area. All emergency services are aware of student locations 
                  and respond prioritizing student safety.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-800/50 p-4 border-t border-gray-700">
              <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                <Clock className="w-3 h-3" />
                <span>Emergency services available 24/7</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
