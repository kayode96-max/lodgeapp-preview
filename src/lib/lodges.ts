import { db } from './firebase';
import { collection, getDocs, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';

export interface Lodge {
  id: string;
  name: string;
  location: string;
  pricePerYear: number; // in Naira
  pricePerSemester: number; // in Naira
  rating: number;
  totalReviews: number;
  images: string[];
  amenities: string[];
  isVerified: boolean;
  landlordName: string;
  distanceFromCampus: string;
  lastUpdated: string;
}

export const fetchLodges = async (): Promise<Lodge[]> => {
  const lodgesCol = collection(db, 'lodges');
  const lodgeSnapshot = await getDocs(lodgesCol);
  return lodgeSnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
    id: doc.id,
    ...doc.data(),
  })) as Lodge[];
};

export const formatNaira = (amount: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
