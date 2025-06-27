'use client';

import { useState, useEffect } from 'react';
import { Search, MapPin, Filter, AlertTriangle, Shield, Phone } from 'lucide-react';
import LodgeCard, { LodgeData } from '@/components/LodgeCard';
import Link from 'next/link';

// Sample data - replace with actual Firestore data
const sampleLodges: LodgeData[] = [
	{
		id: '1',
		name: 'Peace Villa',
		location: 'Gidan Kwano, Minna',
		pricePerYear: 350000,
		pricePerSemester: 180000,
		rating: 4.5,
		totalReviews: 23,
		images: ['/api/placeholder/400/300'],
		amenities: ['Wifi', 'Parking', 'Generator', 'Water'],
		isVerified: true,
		landlordName: 'Mr. Musa Bello',
		distanceFromCampus: '5 min walk',
		lastUpdated: new Date('2025-06-27'),
	},
	{
		id: '2',
		name: 'Royal Lodge',
		location: 'Bosso Estate, Minna',
		pricePerYear: 450000,
		pricePerSemester: 230000,
		rating: 4.2,
		totalReviews: 18,
		images: ['/api/placeholder/400/300'],
		amenities: ['Wifi', 'Security', 'Generator', 'Water', 'Parking'],
		isVerified: true,
		landlordName: 'Mrs. Fatima Adamu',
		distanceFromCampus: '10 min drive',
		lastUpdated: new Date('2025-06-26'),
	},
	{
		id: '3',
		name: 'Student Haven',
		location: 'Tunga, Minna',
		pricePerYear: 280000,
		pricePerSemester: 145000,
		rating: 3.8,
		totalReviews: 31,
		images: ['/api/placeholder/400/300'],
		amenities: ['Generator', 'Water', 'Parking'],
		isVerified: false,
		landlordName: 'Mr. Ibrahim Sani',
		distanceFromCampus: '15 min drive',
		lastUpdated: new Date('2025-06-25'),
	},
];

export default function Home() {
	const [searchQuery, setSearchQuery] = useState('');  const [lodges] = useState<LodgeData[]>(sampleLodges);
	const [filteredLodges, setFilteredLodges] = useState<LodgeData[]>(sampleLodges);
	const [priceRange, setPriceRange] = useState<[number, number]>([100000, 500000]);
	const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);

	useEffect(() => {    const filtered = lodges.filter((lodge) => {
			const matchesSearch =
				lodge.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				lodge.location.toLowerCase().includes(searchQuery.toLowerCase());
			const matchesPrice =
				lodge.pricePerSemester >= priceRange[0] && lodge.pricePerSemester <= priceRange[1];
			const matchesVerification = !showVerifiedOnly || lodge.isVerified;

			return matchesSearch && matchesPrice && matchesVerification;
		});

		setFilteredLodges(filtered);
	}, [searchQuery, lodges, priceRange, showVerifiedOnly]);

	return (
		<div className="min-h-screen">
			{/* Header */}
			<header className="bg-black/20 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						<div className="flex items-center gap-3">
							<div className="bg-purple-600 p-2 rounded-lg">
								<Shield className="w-6 h-6 text-white" />
							</div>
							<div>
								<h1 className="text-xl font-bold text-white">Gidan Kwano</h1>
								<p className="text-xs text-gray-400">FUTMinna Housing</p>
							</div>
						</div>

						<div className="flex items-center gap-4">
							<Link
								href="/report"
								className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
							>
								<AlertTriangle className="w-4 h-4" />
								Report Scam
							</Link>

							<button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors">
								<Phone className="w-4 h-4" />
								Emergency
							</button>
						</div>
					</div>
				</div>
			</header>

			{/* Hero Section */}
			<section className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 py-12 px-4">
				<div className="max-w-4xl mx-auto text-center">
					<h2 className="text-4xl font-bold text-white mb-4">
						Find Safe Student Accommodation Near FUTMinna
					</h2>
					<p className="text-xl text-gray-300 mb-8">
						Verified lodges, honest reviews, and fair pricing for Federal University of Technology, Minna
						students
					</p>

					{/* Search Bar */}
					<div className="relative max-w-2xl mx-auto">
						<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
						<input
							type="text"
							placeholder="Search by lodge name or location..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-full pl-12 pr-4 py-4 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
						/>
					</div>
				</div>
			</section>

			{/* Filters */}
			<section className="bg-gray-900/30 py-6 px-4">
				<div className="max-w-7xl mx-auto">
					<div className="flex flex-wrap items-center gap-4">
						<div className="flex items-center gap-2">
							<Filter className="w-4 h-4 text-gray-400" />
							<span className="text-sm font-medium text-gray-300">Filters:</span>
						</div>

						<div className="flex items-center gap-2">
							<input
								type="checkbox"
								id="verified-only"
								checked={showVerifiedOnly}
								onChange={(e) => setShowVerifiedOnly(e.target.checked)}
								className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500"
							/>
							<label htmlFor="verified-only" className="text-sm text-gray-300">
								Verified Landlords Only
							</label>
						</div>

						<div className="flex items-center gap-3">
							<span className="text-sm text-gray-300">Price/Semester:</span>
							<input
								type="range"
								min="100000"
								max="500000"
								step="10000"
								value={priceRange[1]}
								onChange={(e) =>
									setPriceRange([priceRange[0], Number(e.target.value)])
								}
								className="w-32"
							/>
							<span className="text-sm text-purple-400">
								≤ ₦{new Intl.NumberFormat('en-NG').format(priceRange[1])}
							</span>
						</div>
					</div>
				</div>
			</section>

			{/* Results Section */}
			<section className="py-8 px-4">
				<div className="max-w-7xl mx-auto">
					<div className="flex justify-between items-center mb-6">
						<h3 className="text-2xl font-bold text-white">
							Available Lodges ({filteredLodges.length})
						</h3>
						<div className="flex items-center gap-2 text-sm text-gray-400">
							<MapPin className="w-4 h-4" />
							<span>Near FUTMinna Campus</span>
						</div>
					</div>

					{filteredLodges.length === 0 ? (
						<div className="text-center py-12">
							<div className="text-gray-400 mb-4">
								<Search className="w-12 h-12 mx-auto mb-2 opacity-50" />
								<p>No lodges match your current filters</p>
							</div>
							<button
								onClick={() => {
									setSearchQuery('');
									setPriceRange([100000, 500000]);
									setShowVerifiedOnly(false);
								}}
								className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
							>
								Clear Filters
							</button>
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{filteredLodges.map((lodge) => (
								<LodgeCard key={lodge.id} lodge={lodge} />
							))}
						</div>
					)}
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-gray-900/50 border-t border-gray-800 py-8 px-4 mt-12">
				<div className="max-w-7xl mx-auto text-center">
					<div className="flex justify-center items-center gap-3 mb-4">
						<Shield className="w-6 h-6 text-purple-400" />
						<span className="text-lg font-semibold text-white">Gidan Kwano</span>
					</div>
					<p className="text-gray-400 text-sm mb-4">
						Safe, verified student accommodation for FUTMinna students
					</p>
					<div className="flex justify-center gap-6 text-sm">
						<Link
							href="/report"
							className="text-purple-400 hover:text-purple-300"
						>
							Report Issues
						</Link>
						<Link
							href="/emergency"
							className="text-green-400 hover:text-green-300"
						>
							Emergency Contacts
						</Link>
						<span className="text-gray-500">FUTMinna Security: 090-xxxx-xxxx</span>
					</div>
				</div>
			</footer>
		</div>
	);
}
