// "use client";
// import React, { useState, useMemo } from "react";
// import {
//   Search,
//   Filter,
//   MapPin,
//   Star,
//   Phone,
//   Calendar,
//   DollarSign,
//   Users,
//   Heart,
//   Award,
//   Clock,
//   CheckCircle,
//   X,
//   Sparkles,
//   Shield,
// } from "lucide-react";
// import { Navbar } from "@/app/components/navbar/navbar";

// // Mock data for pandits
// const panditsData = [
//   {
//     id: 1,
//     name: "Pandit Rajesh Sharma",
//     location: "Delhi",
//     specializations: [
//       "Griha Pravesh",
//       "Satyanarayan Puja",
//       "Wedding Ceremonies",
//     ],
//     price: 2500,
//     rating: 4.8,
//     reviews: 120,
//     experience: 15,
//     image:
//       "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
//     phone: "+91 9876543210",
//     availability: "Available",
//     languages: ["Hindi", "English", "Sanskrit"],
//     verified: true,
//     completedPujas: 500,
//   },
//   {
//     id: 2,
//     name: "Pandit Suresh Kumar",
//     location: "Mumbai",
//     specializations: ["Ganesh Puja", "Durga Puja", "Kali Puja"],
//     price: 3000,
//     rating: 4.9,
//     reviews: 200,
//     experience: 20,
//     image:
//       "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
//     phone: "+91 9876543211",
//     availability: "Available",
//     languages: ["Hindi", "Marathi", "Sanskrit"],
//     verified: true,
//     completedPujas: 800,
//   },
//   {
//     id: 3,
//     name: "Pandit Arun Mishra",
//     location: "Varanasi",
//     specializations: ["Rudrabhishek", "Mahamrityunjay Puja", "Thread Ceremony"],
//     price: 1500,
//     rating: 4.7,
//     reviews: 85,
//     experience: 12,
//     image:
//       "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
//     phone: "+91 9876543212",
//     availability: "Busy",
//     languages: ["Hindi", "Sanskrit"],
//     verified: true,
//     completedPujas: 350,
//   },
//   {
//     id: 4,
//     name: "Pandit Vikash Joshi",
//     location: "Jaipur",
//     specializations: ["Lakshmi Puja", "Saraswati Puja", "Navratri Puja"],
//     price: 2000,
//     rating: 4.6,
//     reviews: 95,
//     experience: 10,
//     image:
//       "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
//     phone: "+91 9876543213",
//     availability: "Available",
//     languages: ["Hindi", "Rajasthani", "Sanskrit"],
//     verified: true,
//     completedPujas: 280,
//   },
//   {
//     id: 5,
//     name: "Pandit Ramesh Pandey",
//     location: "Kolkata",
//     specializations: ["Kali Puja", "Durga Puja", "Poila Boishakh"],
//     price: 3500,
//     rating: 4.9,
//     reviews: 150,
//     experience: 25,
//     image:
//       "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=400&h=400&fit=crop&crop=face",
//     phone: "+91 9876543214",
//     availability: "Available",
//     languages: ["Hindi", "Bengali", "Sanskrit"],
//     verified: true,
//     completedPujas: 950,
//   },
//   {
//     id: 6,
//     name: "Pandit Mohan Das",
//     location: "Chennai",
//     specializations: ["Ganesha Puja", "Shiva Puja", "Tamil Wedding"],
//     price: 2800,
//     rating: 4.8,
//     reviews: 110,
//     experience: 18,
//     image:
//       "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
//     phone: "+91 9876543215",
//     availability: "Available",
//     languages: ["Tamil", "Hindi", "Sanskrit"],
//     verified: true,
//     completedPujas: 420,
//   },
// ];

// const locations = [
//   "All Locations",
//   "Delhi",
//   "Mumbai",
//   "Varanasi",
//   "Jaipur",
//   "Kolkata",
//   "Chennai",
// ];
// const pujas = [
//   "All Pujas",
//   "Griha Pravesh",
//   "Satyanarayan Puja",
//   "Wedding Ceremonies",
//   "Ganesh Puja",
//   "Durga Puja",
//   "Kali Puja",
//   "Rudrabhishek",
//   "Lakshmi Puja",
//   "Saraswati Puja",
// ];

// export default function PanditFinder() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedLocation, setSelectedLocation] = useState("All Locations");
//   const [selectedPuja, setSelectedPuja] = useState("All Pujas");
//   const [priceSort, setPriceSort] = useState("none");
//   const [showFilters, setShowFilters] = useState(false);
//   const [minPrice, setMinPrice] = useState("");
//   const [maxPrice, setMaxPrice] = useState("");
//   const [favorites, setFavorites] = useState(new Set());

//   const filteredAndSortedPandits = useMemo(() => {
//     let filtered = panditsData.filter((pandit) => {
//       const matchesSearch =
//         pandit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         pandit.specializations.some((spec) =>
//           spec.toLowerCase().includes(searchTerm.toLowerCase())
//         );

//       const matchesLocation =
//         selectedLocation === "All Locations" ||
//         pandit.location === selectedLocation;

//       const matchesPuja =
//         selectedPuja === "All Pujas" ||
//         pandit.specializations.some((spec) => spec.includes(selectedPuja));

//       const matchesPrice =
//         (!minPrice || pandit.price >= parseInt(minPrice)) &&
//         (!maxPrice || pandit.price <= parseInt(maxPrice));

//       return matchesSearch && matchesLocation && matchesPuja && matchesPrice;
//     });

//     if (priceSort === "low-to-high") {
//       filtered.sort((a, b) => a.price - b.price);
//     } else if (priceSort === "high-to-low") {
//       filtered.sort((a, b) => b.price - a.price);
//     }

//     return filtered;
//   }, [
//     searchTerm,
//     selectedLocation,
//     selectedPuja,
//     priceSort,
//     minPrice,
//     maxPrice,
//   ]);

//   const toggleFavorite = (panditId) => {
//     const newFavorites = new Set(favorites);
//     if (newFavorites.has(panditId)) {
//       newFavorites.delete(panditId);
//     } else {
//       newFavorites.add(panditId);
//     }
//     setFavorites(newFavorites);
//   };

//   const PanditCard = ({ pandit }) => (
//     <div className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
//       {/* Gradient overlay */}
//       <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-red-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

//       {/* Verified badge */}
//       {pandit.verified && (
//         <div className="absolute top-4 right-4 z-10">
//           <div className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
//             <Shield className="w-3 h-3" />
//             Verified
//           </div>
//         </div>
//       )}

//       {/* Favorite button */}
//       <button
//         onClick={() => toggleFavorite(pandit.id)}
//         className="absolute top-4 left-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-all duration-300 group/heart"
//       >
//         <Heart
//           className={`w-5 h-5 transition-all duration-300 group-hover/heart:scale-110 ${
//             favorites.has(pandit.id)
//               ? "text-red-500 fill-red-500"
//               : "text-gray-400 hover:text-red-500"
//           }`}
//         />
//       </button>

//       <div className="relative p-8">
//         {/* Profile section */}
//         <div className="flex flex-col items-center text-center mb-6">
//           <div className="relative mb-4">
//             <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-white shadow-xl">
//               <img
//                 src={pandit.image}
//                 alt={pandit.name}
//                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//               />
//             </div>
//             <div className="absolute -bottom-2 -right-2">
//               <div
//                 className={`w-6 h-6 rounded-full border-3 border-white shadow-md ${
//                   pandit.availability === "Available"
//                     ? "bg-green-500"
//                     : "bg-red-500"
//                 }`}
//               ></div>
//             </div>
//           </div>

//           <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
//             {pandit.name}
//           </h3>

//           <div className="flex items-center gap-2 text-gray-600 mb-3">
//             <MapPin className="w-4 h-4 text-orange-500" />
//             <span className="text-sm font-medium">{pandit.location}</span>
//           </div>

//           {/* Rating */}
//           <div className="flex items-center gap-3 mb-4">
//             <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
//               <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//               <span className="font-bold text-gray-900">{pandit.rating}</span>
//             </div>
//             <span className="text-sm text-gray-500">
//               ({pandit.reviews} reviews)
//             </span>
//           </div>
//         </div>

//         {/* Stats section */}
//         <div className="grid grid-cols-2 gap-4 mb-6">
//           <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
//             <div className="text-2xl font-bold text-blue-600">
//               {pandit.experience}
//             </div>
//             <div className="text-xs text-blue-700 font-medium">Years Exp.</div>
//           </div>
//           <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl">
//             <div className="text-2xl font-bold text-purple-600">
//               {pandit.completedPujas}+
//             </div>
//             <div className="text-xs text-purple-700 font-medium">
//               Pujas Done
//             </div>
//           </div>
//         </div>

//         {/* Specializations */}
//         <div className="mb-6">
//           <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
//             <Sparkles className="w-4 h-4 text-orange-500" />
//             Specializations
//           </h4>
//           <div className="flex flex-wrap gap-2">
//             {pandit.specializations.slice(0, 2).map((spec, index) => (
//               <span
//                 key={index}
//                 className="px-3 py-1 bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 text-xs font-medium rounded-full border border-orange-200"
//               >
//                 {spec}
//               </span>
//             ))}
//             {pandit.specializations.length > 2 && (
//               <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
//                 +{pandit.specializations.length - 2} more
//               </span>
//             )}
//           </div>
//         </div>

//         {/* Price */}
//         <div className="text-center mb-6">
//           <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
//             ₹{pandit.price.toLocaleString()}
//           </div>
//           <div className="text-sm text-gray-500 font-medium">per ceremony</div>
//         </div>

//         {/* Action buttons */}
//         <div className="space-y-3">
//           <button className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
//             <Phone className="w-5 h-5" />
//             Call Now
//           </button>
//           <button className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white border-2 border-orange-200 hover:border-orange-300 text-orange-600 font-semibold rounded-2xl hover:bg-orange-50 transform hover:scale-105 transition-all duration-300">
//             <Calendar className="w-5 h-5" />
//             Book Appointment
//           </button>
//         </div>

//         {/* Availability status */}
//         <div className="mt-4 text-center">
//           <span
//             className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
//               pandit.availability === "Available"
//                 ? "bg-green-100 text-green-700"
//                 : "bg-red-100 text-red-700"
//             }`}
//           >
//             <div
//               className={`w-2 h-2 rounded-full ${
//                 pandit.availability === "Available"
//                   ? "bg-green-500"
//                   : "bg-red-500"
//               }`}
//             ></div>
//             {pandit.availability}
//           </span>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       <Navbar />

//       <div className="mt-32 min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
//         {/* Animated Header */}
//         <div className="relative overflow-hidden">
//           <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-red-500 to-pink-500"></div>
//           <div className="absolute inset-0 bg-black/10"></div>

//           {/* Floating elements */}
//           <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
//           <div className="absolute top-32 right-16 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
//           <div className="absolute bottom-10 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse delay-500"></div>

//           {/* <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//           <div className="text-center">
//             <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 animate-fade-in">
//               Find Your Perfect
//               <span className="block bg-gradient-to-r from-yellow-300 to-orange-200 bg-clip-text text-transparent">
//                 Pandit Ji
//               </span>
//             </h1>
//             <p className="text-xl text-orange-100 max-w-2xl mx-auto leading-relaxed">
//               Connect with verified and experienced pandits for all your sacred
//               ceremonies and religious rituals
//             </p>
//           </div>
//         </div> */}
//         </div>

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           {/* Enhanced Search Section */}
//           <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 mb-12 -mt-20 relative z-10">
//             {/* Search Bar */}
//             <div className="relative mb-6">
//               <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-orange-400" />
//               <input
//                 type="text"
//                 placeholder="Search for pandits, puja types, or locations..."
//                 className="w-full pl-16 pr-6 py-5 text-lg border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-100 focus:border-orange-400 transition-all duration-300 bg-white/50"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>

//             {/* Filter Pills */}
//             <div className="flex flex-wrap gap-4 mb-6">
//               <select
//                 className="px-6 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-100 focus:border-orange-400 bg-white/70 font-medium transition-all duration-300"
//                 value={selectedLocation}
//                 onChange={(e) => setSelectedLocation(e.target.value)}
//               >
//                 {locations.map((location) => (
//                   <option key={location} value={location}>
//                     {location}
//                   </option>
//                 ))}
//               </select>

//               <select
//                 className="px-6 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-100 focus:border-orange-400 bg-white/70 font-medium transition-all duration-300"
//                 value={selectedPuja}
//                 onChange={(e) => setSelectedPuja(e.target.value)}
//               >
//                 {pujas.map((puja) => (
//                   <option key={puja} value={puja}>
//                     {puja}
//                   </option>
//                 ))}
//               </select>

//               <select
//                 className="px-6 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-100 focus:border-orange-400 bg-white/70 font-medium transition-all duration-300"
//                 value={priceSort}
//                 onChange={(e) => setPriceSort(e.target.value)}
//               >
//                 <option value="none">Sort by Price</option>
//                 <option value="low-to-high">Price: Low to High</option>
//                 <option value="high-to-low">Price: High to Low</option>
//               </select>

//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="flex items-center gap-3 px-6 py-3 border-2 border-gray-200 rounded-2xl hover:border-orange-300 hover:bg-orange-50 transition-all duration-300 font-medium bg-white/70"
//               >
//                 <Filter className="w-5 h-5" />
//                 Advanced Filters
//               </button>
//             </div>

//             {/* Advanced Filters */}
//             {showFilters && (
//               <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border-2 border-orange-100">
//                 <div className="flex justify-between items-center mb-4">
//                   <h3 className="text-lg font-bold text-gray-800">
//                     Price Range
//                   </h3>
//                   <button
//                     onClick={() => setShowFilters(false)}
//                     className="p-2 hover:bg-white/60 rounded-full transition-colors duration-200"
//                   >
//                     <X className="w-5 h-5 text-gray-500" />
//                   </button>
//                 </div>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Minimum Price
//                     </label>
//                     <input
//                       type="number"
//                       placeholder="₹ 0"
//                       className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-400 transition-all duration-300"
//                       value={minPrice}
//                       onChange={(e) => setMinPrice(e.target.value)}
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Maximum Price
//                     </label>
//                     <input
//                       type="number"
//                       placeholder="₹ 10,000"
//                       className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-400 transition-all duration-300"
//                       value={maxPrice}
//                       onChange={(e) => setMaxPrice(e.target.value)}
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Results Header */}
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
//             <div>
//               <h2 className="text-3xl font-bold text-gray-900 mb-2">
//                 {filteredAndSortedPandits.length} Verified Pandits
//               </h2>
//               <div className="flex items-center gap-3 text-gray-600">
//                 <Award className="w-5 h-5 text-orange-500" />
//                 <span className="font-medium">
//                   All profiles verified and background checked
//                 </span>
//               </div>
//             </div>
//             <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-green-200 rounded-full">
//               <CheckCircle className="w-5 h-5 text-green-600" />
//               <span className="text-green-800 font-semibold">
//                 100% Trusted Platform
//               </span>
//             </div>
//           </div>

//           {/* Pandits Grid */}
//           {filteredAndSortedPandits.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
//               {filteredAndSortedPandits.map((pandit, index) => (
//                 <div
//                   key={pandit.id}
//                   className="animate-fade-in-up"
//                   style={{ animationDelay: `${index * 100}ms` }}
//                 >
//                   <PanditCard pandit={pandit} />
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-16">
//               <div className="text-gray-400 mb-6">
//                 <Search className="w-24 h-24 mx-auto opacity-50" />
//               </div>
//               <h3 className="text-2xl font-bold text-gray-900 mb-3">
//                 No Pandits Found
//               </h3>
//               <p className="text-gray-600 text-lg max-w-md mx-auto">
//                 Try adjusting your search criteria or explore different filters
//                 to find the perfect pandit for your ceremony.
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Custom CSS for animations */}
//         <style jsx>{`
//           @keyframes fade-in {
//             from {
//               opacity: 0;
//               transform: translateY(30px);
//             }
//             to {
//               opacity: 1;
//               transform: translateY(0);
//             }
//           }

//           @keyframes fade-in-up {
//             from {
//               opacity: 0;
//               transform: translateY(40px);
//             }
//             to {
//               opacity: 1;
//               transform: translateY(0);
//             }
//           }

//           .animate-fade-in {
//             animation: fade-in 1s ease-out;
//           }

//           .animate-fade-in-up {
//             animation: fade-in-up 0.6s ease-out forwards;
//             opacity: 0;
//           }
//         `}</style>
//       </div>
//     </>
//   );
// }
import React from 'react'

export default function page() {
  return (
    <div>page</div>
  )
}
