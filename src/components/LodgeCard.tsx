import { MapPin, Star, Shield, Camera, Wifi, Car } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export interface LodgeData {
  id: string;
  name: string;
  location: string;
  pricePerYear: number;
  pricePerSemester: number;
  rating: number;
  totalReviews: number;
  images: string[];
  amenities: string[];
  isVerified: boolean;
  landlordName: string;
  distanceFromCampus: string;
  lastUpdated: Date;
}

interface LodgeCardProps {
  lodge: LodgeData;
  className?: string;
}

const formatPrice = (amount: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const amenityIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  wifi: Wifi,
  parking: Car,
  generator: Camera, // Using Camera as placeholder
  water: Camera, // Using Camera as placeholder
};

export default function LodgeCard({ lodge, className = '' }: LodgeCardProps) {
  const {
    id,
    name,
    location,
    pricePerYear,
    pricePerSemester,
    rating,
    totalReviews,
    images,
    amenities,
    isVerified,
    landlordName,
    distanceFromCampus,
  } = lodge;

  return (
    <Link href={`/lodge/${id}`}>
      <div className={`bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden hover:bg-gray-800/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/10 ${className}`}>
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={images[0] || '/api/placeholder/400/200'}
            alt={name}
            fill
            className="object-cover"
          />
          
          {/* Verified Badge */}
          {isVerified && (
            <div className="absolute top-3 left-3 bg-green-600 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1">
              <Shield size={12} />
              Verified
            </div>
          )}
          
          {/* Images Count */}
          <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-md text-xs flex items-center gap-1">
            <Camera size={12} />
            {images.length}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4">
          {/* Header */}
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-white line-clamp-1">
              {name}
            </h3>
            <div className="flex items-center gap-1 text-yellow-400">
              <Star size={16} fill="currentColor" />
              <span className="text-sm font-medium">{rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1 text-gray-400 mb-2">
            <MapPin size={14} />
            <span className="text-sm">{location}</span>
            <span className="text-xs">• {distanceFromCampus} from campus</span>
          </div>

          {/* Reviews */}
          <div className="text-xs text-gray-400 mb-3">
            {totalReviews} reviews • Landlord: {landlordName}
          </div>

          {/* Amenities */}
          <div className="flex gap-2 mb-4">
            {amenities.slice(0, 3).map((amenity) => {
              const IconComponent = amenityIcons[amenity.toLowerCase()] || Camera;
              return (
                <div
                  key={amenity}
                  className="bg-purple-900/30 text-purple-300 px-2 py-1 rounded-md text-xs flex items-center gap-1"
                >
                  <IconComponent size={12} />
                  {amenity}
                </div>
              );
            })}
            {amenities.length > 3 && (
              <div className="bg-gray-700 text-gray-300 px-2 py-1 rounded-md text-xs">
                +{amenities.length - 3} more
              </div>
            )}
          </div>

          {/* Pricing */}
          <div className="border-t border-gray-700 pt-3">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-xl font-bold text-white">
                  {formatPrice(pricePerSemester)}
                  <span className="text-sm font-normal text-gray-400">/semester</span>
                </div>
                <div className="text-sm text-gray-400">
                  {formatPrice(pricePerYear)}/year
                </div>
              </div>
              
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
