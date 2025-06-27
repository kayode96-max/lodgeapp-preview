'use client';

import { useState } from 'react';
import { ArrowLeft, MapPin, Star, Shield, Camera, Wifi, Car, Phone, MessageCircle, AlertTriangle, Share2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import PriceChart, { PriceHistoryData } from '@/components/PriceChart';
import PriceComparator from '@/components/PriceComparator';
import AnonymousReview from '@/components/AnonymousReview';

// Sample data - replace with actual Firestore data
const sampleLodge = {
  id: '1',
  name: 'Peace Villa',
  location: 'Gidan Kwano, Minna',
  pricePerYear: 350000,
  pricePerSemester: 180000,
  rating: 4.5,
  totalReviews: 23,
  images: [
    '/api/placeholder/600/400',
    '/api/placeholder/600/400',
    '/api/placeholder/600/400',
    '/api/placeholder/600/400'
  ],
  amenities: ['Wifi', 'Parking', 'Generator', 'Water', 'Security', 'Kitchen'],
  isVerified: true,
  landlordName: 'Mr. Musa Bello',
  landlordPhone: '+234 803 xxx xxxx',
  distanceFromCampus: '5 min walk',
  description: 'Spacious and comfortable student accommodation with modern amenities. Located in the heart of Gidan Kwano, just a few minutes walk from FUTMinna main campus. Features include reliable power supply, clean water, high-speed internet, and 24/7 security.',
  roomTypes: [
    { type: 'Single Room', price: 180000, available: 3 },
    { type: 'Shared Room', price: 120000, available: 5 },
    { type: 'Self-Contained', price: 250000, available: 2 }
  ],
  lastUpdated: new Date('2025-06-27'),
};

const samplePriceHistory: PriceHistoryData[] = [
  { month: 'Jul 2024', price: 170000, averagePrice: 175000 },
  { month: 'Aug 2024', price: 170000, averagePrice: 178000 },
  { month: 'Sep 2024', price: 175000, averagePrice: 180000 },
  { month: 'Oct 2024', price: 175000, averagePrice: 182000 },
  { month: 'Nov 2024', price: 175000, averagePrice: 185000 },
  { month: 'Dec 2024', price: 180000, averagePrice: 187000 },
  { month: 'Jan 2025', price: 180000, averagePrice: 190000 },
  { month: 'Feb 2025', price: 180000, averagePrice: 192000 },
  { month: 'Mar 2025', price: 180000, averagePrice: 195000 },
  { month: 'Apr 2025', price: 180000, averagePrice: 198000 },
  { month: 'May 2025', price: 180000, averagePrice: 200000 },
  { month: 'Jun 2025', price: 180000, averagePrice: 202000 },
];

const amenityIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  wifi: Wifi,
  parking: Car,
  generator: Camera,
  water: Camera,
  security: Shield,
  kitchen: Camera,
};

export default function LodgeDetails() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showAllAmenities, setShowAllAmenities] = useState(false);

  const formatPrice = (amount: number): string => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-3 text-white hover:text-purple-300 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Search</span>
            </Link>
            
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg text-sm transition-colors">
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <Link 
                href="/report" 
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <AlertTriangle className="w-4 h-4" />
                Report
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden">
              <div className="relative h-96">
                <Image
                  src={sampleLodge.images[selectedImageIndex]}
                  alt={sampleLodge.name}
                  fill
                  className="object-cover"
                />
                {sampleLodge.isVerified && (
                  <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-2">
                    <Shield size={16} />
                    Verified Landlord
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <div className="flex gap-2 overflow-x-auto">
                  {sampleLodge.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                        selectedImageIndex === index ? 'border-purple-500' : 'border-gray-600'
                      }`}
                    >
                      <Image src={image} alt={`${sampleLodge.name} ${index + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Lodge Information */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{sampleLodge.name}</h1>
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <MapPin size={16} />
                    <span>{sampleLodge.location} • {sampleLodge.distanceFromCampus} from campus</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star size={16} fill="currentColor" />
                      <span className="font-medium">{sampleLodge.rating}</span>
                    </div>
                    <span className="text-gray-400">({sampleLodge.totalReviews} reviews)</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-3xl font-bold text-white">
                    {formatPrice(sampleLodge.pricePerSemester)}
                  </div>
                  <div className="text-gray-400">per semester</div>
                  <div className="text-sm text-gray-500">
                    {formatPrice(sampleLodge.pricePerYear)}/year
                  </div>
                </div>
              </div>

              <p className="text-gray-300 mb-6">{sampleLodge.description}</p>

              {/* Amenities */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {(showAllAmenities ? sampleLodge.amenities : sampleLodge.amenities.slice(0, 6)).map((amenity) => {
                    const IconComponent = amenityIcons[amenity.toLowerCase()] || Camera;
                    return (
                      <div
                        key={amenity}
                        className="bg-purple-900/20 border border-purple-700/30 text-purple-300 px-3 py-2 rounded-lg text-sm flex items-center gap-2"
                      >
                        <IconComponent size={16} />
                        {amenity}
                      </div>
                    );
                  })}
                </div>
                {sampleLodge.amenities.length > 6 && (
                  <button
                    onClick={() => setShowAllAmenities(!showAllAmenities)}
                    className="mt-3 text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
                  >
                    {showAllAmenities ? 'Show Less' : `+${sampleLodge.amenities.length - 6} More Amenities`}
                  </button>
                )}
              </div>

              {/* Room Types */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Available Room Types</h3>
                <div className="space-y-3">
                  {sampleLodge.roomTypes.map((room) => (
                    <div key={room.type} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 flex justify-between items-center">
                      <div>
                        <div className="font-medium text-white">{room.type}</div>
                        <div className="text-sm text-gray-400">{room.available} rooms available</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-white">{formatPrice(room.price)}</div>
                        <div className="text-xs text-gray-400">per semester</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Price Analysis */}
            <PriceComparator
              currentPrice={sampleLodge.pricePerSemester}
              averagePrice={202000}
              priceHistory={samplePriceHistory.map(p => p.price)}
              location={sampleLodge.location}
            />

            {/* Price Chart */}
            <PriceChart
              data={samplePriceHistory}
              currentPrice={sampleLodge.pricePerSemester}
              lodgeName={sampleLodge.name}
            />

            {/* Anonymous Review Form */}
            <AnonymousReview lodgeId={sampleLodge.id} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-white mb-4">Contact Landlord</h3>
              
              <div className="mb-4">
                <div className="text-sm text-gray-400">Landlord</div>
                <div className="font-medium text-white">{sampleLodge.landlordName}</div>
              </div>

              <div className="space-y-3 mb-6">
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  Call {sampleLodge.landlordPhone}
                </button>
                
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Send Message
                </button>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <div className="text-xs text-gray-500 mb-2">Safety Tips:</div>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• Visit the property in person</li>
                  <li>• Verify landlord identity</li>
                  <li>• Never pay without seeing receipts</li>
                  <li>• Report suspicious activity</li>
                </ul>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Listed</span>
                  <span className="text-white">2 weeks ago</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Views</span>
                  <span className="text-white">127 this month</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Inquiries</span>
                  <span className="text-white">23 this week</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Response Rate</span>
                  <span className="text-green-400">95%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
